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