import { ImageInfo } from '../../shared/types';
import { Config } from '../../main/api/config';

declare global {
  interface Window {
    electronAPI: {
      config: {
        get: () => Promise<Config>;
        update: (newConfig: Partial<Config>) => Promise<Config>;
      };
      images: {
        upload: () => Promise<{
          success: boolean;
          data?: ImageInfo;
          message?: string;
        }>;
        getAll: () => Promise<{
          success: boolean;
          data?: ImageInfo[];
          message?: string;
        }>;
        delete: (fileName: string) => Promise<{
          success: boolean;
          message?: string;
        }>;
      };
    };
  }
}