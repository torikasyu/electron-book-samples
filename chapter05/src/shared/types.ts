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
}

/**
 * 画像アップロードの結果を表すインターフェース
 */
export interface ImageUploadResult {
  success: boolean;
  message?: string;
}

/**
 * 画像一覧取得の結果を表すインターフェース
 */
export interface ImageListResult {
  success: boolean;
  data?: ImageInfo[];
  message?: string;
}

/**
 * 画像削除の結果を表すインターフェース
 */
export interface ImageDeleteResult {
  success: boolean;
  message?: string;
}

/**
 * IPC通信で使用するチャンネル名の定義
 */
export enum IpcChannels {
  UPLOAD_IMAGE = 'upload-image',
  GET_IMAGES = 'get-images',
  DELETE_IMAGE = 'delete-image',
  GET_CONFIG = 'get-config',
  UPDATE_CONFIG = 'update-config'
}