// Electronプリロードスクリプトが公開するAPIの型定義
import { SystemInfo } from '../../shared/types';

declare global {
  interface Window {
    electronAPI: {
      // ファイル選択ダイアログを開く
      openFile: () => Promise<string | undefined>;
      
      // システム情報を取得
      getSystemInfo: () => Promise<SystemInfo>;
    }
  }
}