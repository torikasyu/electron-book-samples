import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannels, ImageInfo } from '../shared/types';

/**
 * レンダラープロセスで使用するAPI
 */
const api = {
  // 設定関連
  config: {
    // 設定を取得
    get: () => ipcRenderer.invoke(IpcChannels.GET_CONFIG),
    // 設定を更新
    update: (newConfig: any) => ipcRenderer.invoke(IpcChannels.UPDATE_CONFIG, newConfig)
  },
  
  // 画像関連
  images: {
    // 画像をアップロード
    upload: () => ipcRenderer.invoke(IpcChannels.UPLOAD_IMAGE),
    // 画像一覧を取得
    getAll: () => ipcRenderer.invoke(IpcChannels.GET_IMAGES),
    // 画像を削除
    delete: (fileName: string) => ipcRenderer.invoke(IpcChannels.DELETE_IMAGE, fileName),
  }
};

// contextBridgeを使用してレンダラープロセスに安全にAPIを公開
contextBridge.exposeInMainWorld('electronAPI', api);