import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * アプリケーションの設定を管理するインターフェース
 */
interface Config {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseBucket: string;
  // 他の設定項目があれば追加
}

/**
 * 環境に応じた設定を取得する関数
 * 開発環境では.envから、本番環境ではユーザーデータディレクトリのconfig.jsonから読み込む
 */
export function getConfig(): Config {
  // 開発環境では.envから読み込む
  // if (process.env.NODE_ENV === 'development') {
  //   dotenv.config();
  //   return {
  //     supabaseUrl: process.env.SUPABASE_URL || '',
  //     supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  //   };
  // }

  // 本番環境ではユーザーデータディレクトリのconfig.jsonから読み込む
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');

  // 設定ファイルが存在しない場合は作成
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = {
      supabaseUrl: '',
      supabaseAnonKey: '',
      supabaseBucket: 'images',
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }

  // 設定ファイルを読み込む
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData) as Config;
    
    // 旧設定ファイルにバケット名がない場合はデフォルト値を設定
    if (!config.supabaseBucket) {
      config.supabaseBucket = 'images';
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
    
    return config;
  } catch (error) {
    console.error('設定ファイルの読み込みに失敗しました:', error);
    return {
      supabaseUrl: '',
      supabaseAnonKey: '',
      supabaseBucket: 'images',
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
  
  // 開発環境では.envを更新（実際には.envの更新は手動で行うことが多い）
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('開発環境では設定の更新は.envファイルを手動で編集してください');
  //   return;
  // }
  
  // 本番環境ではconfig.jsonを更新
  const userDataPath = app.getPath('userData');
  const configPath = path.join(userDataPath, 'config.json');
  
  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
}