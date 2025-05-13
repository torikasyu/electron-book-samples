/**
 * 画像情報を表すインターフェース
 */
export interface ImageInfo {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  size: number;
  type: string;
  tags?: string[];
}

/**
 * IPC通信で使用するチャンネル名の定義
 */
export enum IpcChannels {
  UPLOAD_IMAGE = 'upload-image',
  GET_IMAGES = 'get-images',
  DELETE_IMAGE = 'delete-image',
  UPDATE_IMAGE = 'update-image',
  GET_CONFIG = 'get-config',
  UPDATE_CONFIG = 'update-config'
}