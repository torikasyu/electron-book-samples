import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { getConfig, updateConfig } from './config';
import { IpcChannels, ImageInfo } from '../shared/types';

// グローバル変数としてウィンドウオブジェクトを保持
// これはJavaScriptのガベージコレクションによってウィンドウが閉じられるのを防ぐため
let mainWindow: BrowserWindow | null = null;

// Supabaseクライアントの初期化関数
function initSupabaseClient() {
  try {
    const config = getConfig();
    
    // URLとAPIキーの存在確認
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      console.error('Supabaseの設定が不足しています');
      return null;
    }    
    // クライアントの初期化
    // 追加オプションを指定して初期化
    const client = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: false, // セッションを持続しない
        autoRefreshToken: false, // トークンの自動更新を行わない
      }
    });
    return client;
  } catch (error) {
    console.error('Supabaseクライアントの初期化中にエラーが発生しました:', error);
    return null;
  }
}

// メインウィンドウを作成する関数
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // 開発環境ではDevToolsを開く
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // レンダラープロセスのHTMLをロード
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// アプリケーションの初期化が完了したときの処理
app.whenReady().then(() => {
  createWindow();

  // macOSでは、ユーザーがDockアイコンをクリックしたときにウィンドウがない場合は再作成
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // IPC通信のハンドラーを設定
  setupIpcHandlers();
});

// すべてのウィンドウが閉じられたときの処理（Windows & Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC通信のハンドラーを設定する関数
function setupIpcHandlers() {
  // 設定を取得
  ipcMain.handle(IpcChannels.GET_CONFIG, () => {
    return getConfig();
  });

  // 設定を更新
  ipcMain.handle(IpcChannels.UPDATE_CONFIG, (_, newConfig) => {
    updateConfig(newConfig);
    return getConfig();
  });

  // 画像をアップロード
  ipcMain.handle(IpcChannels.UPLOAD_IMAGE, async () => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      // ファイル選択ダイアログを表示
      const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: '画像', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
        ]
      });

      if (filePaths.length === 0) {
        return { success: false, message: 'ファイルが選択されていません' };
      }

      const filePath = filePaths[0];
      const fileName = path.basename(filePath);
      // ファイルの拡張子を取得
      const fileExt = path.extname(fileName).toLowerCase();
      
      // 完全に安全なファイル名を生成（タイムスタンプとランダム文字列のみを使用）
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 10);
      const safeFileName = `${timestamp}_${randomString}${fileExt}`;
      
      const fileContent = fs.readFileSync(filePath);
      const fileStats = fs.statSync(filePath);

      // 設定からバケット名を取得
      const config = getConfig();
      const bucketName = config.supabaseBucket;
      
      console.dir(config, { depth: null })
      // ファイルの拡張子からMIMEタイプを取得
      const ext = fileExt.substring(1);
      let contentType = 'application/octet-stream'; // デフォルトのMIMEタイプ
      
      // 一般的な画像ファイルのMIMEタイプを設定
      const mimeTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'bmp': 'image/bmp'
      };
      
      if (ext in mimeTypes) {
        contentType = mimeTypes[ext];
      }
      
      console.log('アップロード情報:', {
        originalFileName: fileName,
        safeFileName,
        contentType,
        bucketName
      });
      
      // Supabaseのストレージにアップロード
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${safeFileName}`, fileContent, {
          contentType,
          upsert: true // 同名ファイルが存在する場合は上書き
        });

      if (error) {
        throw error;
      }

      // アップロードした画像の公開URLを取得
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`public/${safeFileName}`);

      return { success: true, publicUrl};
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });

  // 画像一覧を取得
  ipcMain.handle(IpcChannels.GET_IMAGES, async () => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      // 設定からバケット名を取得
      const config = getConfig();
      const bucketName = config.supabaseBucket;
      
      // Storageから画像一覧を取得
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list('public', {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        throw error;
      }

      // 各ファイルの公開URLを取得して画像情報を作成
      const imageList = data.map(file => {
        // ファイル名をそのまま使用（すでに安全な形式になっている）
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(`public/${file.name}`);
          
        return {
          id: file.id,
          name: file.name,
          url: publicUrl,
          createdAt: file.created_at,
          size: file.metadata?.size || 0,
          type: path.extname(file.name).substring(1),
        };
      });

      return { success: true, data: imageList };
    } catch (error) {
      console.error('画像取得エラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });

  // 画像を削除
  ipcMain.handle(IpcChannels.DELETE_IMAGE, async (_, fileName: string) => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      // 設定からバケット名を取得
      const config = getConfig();
      const bucketName = config.supabaseBucket;
      
      // ファイル名をエンコード
      const encodedFileName = encodeURIComponent(fileName);
      
      // ストレージから削除
      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([`public/${encodedFileName}`]);

      if (storageError) {
        throw storageError;
      }

      return { success: true };
    } catch (error) {
      console.error('画像削除エラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });
}