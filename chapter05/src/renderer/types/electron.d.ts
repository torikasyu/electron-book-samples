import { ImageInfo } from '../../shared/types';

declare global {
  interface Window {
    electronAPI: {
      config: {
        get: () => Promise<{
          supabaseUrl: string;
          supabaseAnonKey: string;
        }>;
        update: (newConfig: {
          supabaseUrl?: string;
          supabaseAnonKey?: string;
        }) => Promise<{
          supabaseUrl: string;
          supabaseAnonKey: string;
        }>;
      };
      images: {
        upload: (tags: string[]) => Promise<{
          success: boolean;
          data?: ImageInfo;
          message?: string;
        }>;
        getAll: () => Promise<{
          success: boolean;
          data?: ImageInfo[];
          message?: string;
        }>;
        delete: (imageId: string, fileName: string) => Promise<{
          success: boolean;
          message?: string;
        }>;
        update: (imageId: string, updates: Partial<ImageInfo>) => Promise<{
          success: boolean;
          data?: ImageInfo;
          message?: string;
        }>;
      };
    };
  }
}