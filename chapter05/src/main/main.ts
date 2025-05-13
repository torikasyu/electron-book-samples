import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { getConfig, updateConfig } from '../config';
import { IpcChannels, ImageInfo } from '../shared/types';

// グローバル変数としてウィンドウオブジェクトを保持
// これはJavaScriptのガベージコレクションによってウィンドウが閉じられるのを防ぐため
let mainWindow: BrowserWindow | null = null;

// Supabaseクライアントの初期化関数
function initSupabaseClient() {
  const config = getConfig();
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    console.error('Supabaseの設定が不足しています');
    return null;
  }
  return createClient(config.supabaseUrl, config.supabaseAnonKey);
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
  ipcMain.handle(IpcChannels.UPLOAD_IMAGE, async (_, tags: string[]) => {
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
      const fileContent = fs.readFileSync(filePath);
      const fileStats = fs.statSync(filePath);

      // Supabaseのストレージにアップロード
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`public/${fileName}`, fileContent, {
          contentType: path.extname(fileName).substring(1)
        });

      if (error) {
        throw error;
      }

      // アップロードした画像の公開URLを取得
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(`public/${fileName}`);

      // メタデータをデータベースに保存（例：テーブルがあると仮定）
      const { data: imageData, error: dbError } = await supabase
        .from('images')
        .insert({
          name: fileName,
          url: publicUrl,
          size: fileStats.size,
          type: path.extname(fileName).substring(1),
          tags: tags
        })
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      return { success: true, data: imageData };
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      return { success: false, message: error.message };
    }
  });

  // 画像一覧を取得
  ipcMain.handle(IpcChannels.GET_IMAGES, async () => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('画像取得エラー:', error);
      return { success: false, message: error.message };
    }
  });

  // 画像を削除
  ipcMain.handle(IpcChannels.DELETE_IMAGE, async (_, imageId: string, fileName: string) => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      // データベースから削除
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', imageId);

      if (dbError) {
        throw dbError;
      }

      // ストレージから削除
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([`public/${fileName}`]);

      if (storageError) {
        throw storageError;
      }

      return { success: true };
    } catch (error) {
      console.error('画像削除エラー:', error);
      return { success: false, message: error.message };
    }
  });

  // 画像情報を更新
  ipcMain.handle(IpcChannels.UPDATE_IMAGE, async (_, imageId: string, updates: Partial<ImageInfo>) => {
    try {
      const supabase = initSupabaseClient();
      if (!supabase) {
        throw new Error('Supabaseクライアントの初期化に失敗しました');
      }

      const { data, error } = await supabase
        .from('images')
        .update(updates)
        .eq('id', imageId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      console.error('画像更新エラー:', error);
      return { success: false, message: error.message };
    }
  });
}