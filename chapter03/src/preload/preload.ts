// プリロードスクリプト
// メインプロセスとレンダラープロセス間の安全な通信を提供します

import { contextBridge, ipcRenderer } from 'electron';

// レンダラープロセスに公開するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
  // メインプロセスにメッセージを送信する関数
  sendMessage: (channel: string, data: any) => {
    // 許可されたチャンネルのみ通信を許可
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  
  // メインプロセスからのメッセージを受信する関数
  receiveMessage: (channel: string, func: (...args: any[]) => void) => {
    // 許可されたチャンネルのみ通信を許可
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // 古いリスナーを削除して、新しいリスナーを追加
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (_, ...args) => func(...args));
    }
  }
});