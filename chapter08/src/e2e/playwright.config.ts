import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // テストのタイムアウト設定
  timeout: 30000,
  // テスト実行の並列数
  workers: 1,
  // テストファイルのパターン
  testMatch: ['**/*.e2e-test.ts'],
  // テスト実行時の詳細レベル
  reporter: 'list',
  // テスト実行時の環境変数
  use: {
    // テストごとにスクリーンショットを撮影
    screenshot: 'only-on-failure',
    // テストごとにビデオを記録
    video: 'on-first-retry',
    // トレースを記録
    trace: 'on-first-retry',
  },
};

export default config;