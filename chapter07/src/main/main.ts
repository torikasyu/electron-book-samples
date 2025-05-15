import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: undefined, // 必要に応じてpreloadスクリプトを設定
    },
  });

  // ビルド済みのindex.htmlを読み込み
  mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));

  // 開発時にはDevToolsを開く
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// Electronアプリの準備ができたらウィンドウを作成
app.whenReady().then(() => {
  createWindow();

  // macOSでアプリケーションがアクティブになったときの処理
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外では、ウィンドウがすべて閉じられたらアプリを終了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
