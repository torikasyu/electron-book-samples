// 共有型定義

// システム情報の型
export interface SystemInfo {
  platform: string;
  arch: string;
  cpus: {
    model: string;
    speed: number;
  }[];
  memory: {
    total: number;
    free: number;
  };
  uptime: number;
}

// ファイル情報の型
export interface FileInfo {
  path: string;
  size: number;
  created: number;
  modified: number;
  accessed: number;
  isDirectory: boolean;
  isFile: boolean;
  permissions: {
    readable: boolean;
    writable: boolean;
    executable: boolean;
  };
}