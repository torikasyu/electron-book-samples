import { app, BrowserWindow } from 'electron';
import * as path from 'path';

// メインウィンドウの参照をグローバルに保持
let mainWindow: BrowserWindow | null = null;

/**
 * メインウィンドウを作成する関数
 */
function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // プリロードスクリプトのパス
      preload: path.join(__dirname, 'preload.js'),
      // コンテキスト分離を有効に
      contextIsolation: true,
      // Node.js APIをレンダラープロセスで直接利用することを禁止
      nodeIntegration: false,
    },
  });

  // メインウィンドウに表示するHTMLファイルをロード
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // 開発時は開発者ツールを開く
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    // ウィンドウオブジェクトの参照を破棄
    mainWindow = null;
  });
}

// Electronの初期化が完了したらウィンドウを作成
app.whenReady().then(() => {
  createWindow();

  // macOSではドックアイコンクリック時にウィンドウがない場合は新しく作成
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// すべてのウィンドウが閉じられたときの処理
app.on('window-all-closed', () => {
  // macOS以外ではアプリを終了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});