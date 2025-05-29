import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { getConfig, updateConfig } from './api/config';
import { uploadImage, getImages, deleteImage } from './api/images';
import { IpcChannels, ImageUploadResult, ImageListResult, ImageDeleteResult } from '../shared/types';

// グローバル変数としてウィンドウオブジェクトを保持
// これはJavaScriptのガベージコレクションによってウィンドウが閉じられるのを防ぐため
let mainWindow: BrowserWindow | null = null;

// グローバル変数やヘルパー関数はここに定義

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
  ipcMain.handle(IpcChannels.UPLOAD_IMAGE, async (): Promise<ImageUploadResult> => {
    try {
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

      // 画像アップロード処理を実行
      return await uploadImage(filePaths[0]);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });

  // 画像一覧を取得
  ipcMain.handle(IpcChannels.GET_IMAGES, async (): Promise<ImageListResult> => {
    try {
      // 画像一覧取得処理を実行
      return await getImages();
    } catch (error) {
      console.error('画像取得エラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });

  // 画像を削除
  ipcMain.handle(IpcChannels.DELETE_IMAGE, async (_, fileName: string): Promise<ImageDeleteResult> => {
    try {
      // 画像削除処理を実行
      return await deleteImage(fileName);
    } catch (error) {
      console.error('画像削除エラー:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
      };
    }
  });
}