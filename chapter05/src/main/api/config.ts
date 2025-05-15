import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

/**
 * アプリケーションの設定を管理するインターフェース
 */
export interface Config {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseBucket: string;
}

export function getConfig(): Config {
  // ユーザーデータディレクトリのconfig.jsonから読み込む
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');

  // 設定ファイルが存在しない場合は作成
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = {
      supabaseUrl: '',
      supabaseAnonKey: '',
      supabaseBucket: '',
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }

  // 設定ファイルを読み込む
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData) as Config;
    return config;
  } catch (error) {
    console.error('設定ファイルの読み込みに失敗しました:', error);
    return {
      supabaseUrl: '',
      supabaseAnonKey: '',
      supabaseBucket: '',
    };
  }
}

/**
 * 設定を更新する関数
 * @param newConfig 更新する設定の一部
 */
export function updateConfig(newConfig: Partial<Config>): void {
  const config = getConfig();
  const updatedConfig = { ...config, ...newConfig };
  
  // config.jsonを更新
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');
  
  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
}