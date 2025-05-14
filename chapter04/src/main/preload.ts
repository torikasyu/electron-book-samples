import { contextBridge, ipcRenderer } from 'electron';
import { SystemInfo, FileInfo } from '../shared/types';

// レンダラープロセスに公開するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
  // ファイル選択ダイアログを開き、ファイル情報を取得
  openFile: (): Promise<FileInfo | undefined> => ipcRenderer.invoke('dialog:openFile'),
  
  // システム情報を取得
  getSystemInfo: (): Promise<SystemInfo> => ipcRenderer.invoke('system:getInfo')
});