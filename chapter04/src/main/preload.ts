import { contextBridge, ipcRenderer } from 'electron';
import { SystemInfo } from '../shared/types';

// レンダラープロセスに公開するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
  // ファイル選択ダイアログを開く
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  
  // システム情報を取得
  getSystemInfo: () => ipcRenderer.invoke('system:getInfo'),
  
  // IPCイベントの送受信
  on: (channel: string, callback: (...args: any[]) => void) => {
    const validChannels = ['file-opened', 'system-info'];
    if (validChannels.includes(channel)) {
      // 元のイベントオブジェクトを削除するラッパー関数
      const subscription = (_event: any, ...args: any[]) => callback(...args);
      ipcRenderer.on(channel, subscription);
      
      // 購読解除用の関数を返す
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
    
    return undefined;
  }
});