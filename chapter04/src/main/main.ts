import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';
import * as fs from 'fs';
import { SystemInfo, FileInfo } from '../shared/types';

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

// ファイル選択ダイアログを開き、ファイル情報を取得
ipcMain.handle('dialog:openFile', async (): Promise<FileInfo | undefined> => {
  if (!mainWindow) return undefined;
  
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'すべてのファイル', extensions: ['*'] }
    ]
  });
  
  if (canceled || filePaths.length === 0) {
    return undefined;
  }
  
  const filePath = filePaths[0];
  
  try {
    // ファイルの詳細情報を取得
    const stats = fs.statSync(filePath);
    
    // ファイルのパーミッションを確認
    let readable = false;
    let writable = false;
    let executable = false;
    
    try {
      // 読み取り権限の確認
      fs.accessSync(filePath, fs.constants.R_OK);
      readable = true;
    } catch (e) {
      readable = false;
    }
    
    try {
      // 書き込み権限の確認
      fs.accessSync(filePath, fs.constants.W_OK);
      writable = true;
    } catch (e) {
      writable = false;
    }
    
    try {
      // 実行権限の確認
      fs.accessSync(filePath, fs.constants.X_OK);
      executable = true;
    } catch (e) {
      executable = false;
    }
    
    // ファイル情報オブジェクトを作成して返す
    const fileInfo: FileInfo = {
      path: filePath,
      size: stats.size,
      created: stats.birthtimeMs,
      modified: stats.mtimeMs,
      accessed: stats.atimeMs,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      permissions: {
        readable,
        writable,
        executable
      }
    };
    
    return fileInfo;
  } catch (error) {
    console.error('ファイル情報の取得エラー:', error);
    return undefined;
  }
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