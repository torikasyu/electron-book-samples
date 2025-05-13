import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';
import { SystemInfo } from '../shared/types';

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
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
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

// IPCイベントの処理

// ファイル選択ダイアログを開く
ipcMain.handle('dialog:openFile', async () => {
  if (!mainWindow) return undefined;
  
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'テキストファイル', extensions: ['txt', 'md'] },
      { name: 'すべてのファイル', extensions: ['*'] }
    ]
  });
  
  if (canceled) {
    return undefined;
  }
  
  return filePaths[0];
});

// システム情報を取得
ipcMain.handle('system:getInfo', async (): Promise<SystemInfo> => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  
  return {
    platform: os.platform(),
    arch: os.arch(),
    cpus: cpus.map(cpu => ({
      model: cpu.model,
      speed: cpu.speed
    })),
    memory: {
      total: totalMemory,
      free: freeMemory
    },
    uptime: os.uptime()
  };
});