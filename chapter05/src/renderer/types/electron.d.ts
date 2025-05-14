import { ImageInfo } from '../../shared/types';

declare global {
  interface Window {
    electronAPI: {
      config: {
        get: () => Promise<{
          supabaseUrl: string;
          supabaseAnonKey: string;
          supabaseBucket: string;
        }>;
        update: (newConfig: {
          supabaseUrl?: string;
          supabaseAnonKey?: string;
          supabaseBucket?: string;
        }) => Promise<{
          supabaseUrl: string;
          supabaseAnonKey: string;
          supabaseBucket: string;
        }>;
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