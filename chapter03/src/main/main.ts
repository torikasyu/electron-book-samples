import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

// アプリケーションのメインウィンドウを保持する変数
let mainWindow: BrowserWindow | null = null;

// 開発モードかどうかを判定
const isDev = process.env.NODE_ENV === 'development';

/**
 * メインウィンドウを作成する関数
 */
const createWindow = (): void => {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // HTMLファイルをロード
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // 開発モードの場合は開発者ツールを開く
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// アプリケーションの準備が整ったらウィンドウを作成
app.on('ready', createWindow);

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOSでは、ユーザーがCmd + Qで明示的に終了するまで
  // アプリケーションとそのメニューバーは有効なままにするのが一般的
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アプリケーションがアクティブになったときの処理（macOS）
app.on('activate', () => {
  // macOSでは、ドックアイコンがクリックされてほかにウィンドウが
  // 開いていないときに、アプリケーションでウィンドウを再作成するのが一般的
  if (mainWindow === null) {
    createWindow();
  }
});