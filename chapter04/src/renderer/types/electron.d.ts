// Electronプリロードスクリプトが公開するAPIの型定義
import { SystemInfo, FileInfo } from '../../shared/types';

declare global {
  interface Window {
    electronAPI: {
      // ファイル選択ダイアログを開き、ファイル情報を取得
      openFile: () => Promise<FileInfo | undefined>;
      
      // システム情報を取得
      getSystemInfo: () => Promise<SystemInfo>;
    }
  }
}