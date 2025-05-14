import { contextBridge, ipcRenderer } from 'electron';
import { SystemInfo } from '../shared/types';

// レンダラープロセスに公開するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
  // ファイル選択ダイアログを開く
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  
  // システム情報を取得
  getSystemInfo: () => ipcRenderer.invoke('system:getInfo')
});