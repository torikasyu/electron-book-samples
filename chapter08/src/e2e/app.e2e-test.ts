import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import type { ElectronApplication, Page } from 'playwright';
import * as path from 'path';

/**
 * ElectronアプリケーションのE2Eテスト
 */

// シンプルなテストを実行するためのヘルパー関数
const runTest = async (testFn: (window: Page) => Promise<void>) => {
  let electronApp: ElectronApplication | undefined;
  
  try {
    // アプリのパスを確認
    const appPath = path.join(__dirname, '../../dist/main.js');
    
    // Electronアプリを起動
    electronApp = await electron.launch({
      args: [appPath],
    });
    
    // メインウィンドウを取得
    const window = await electronApp.firstWindow();
    
    // テスト関数を実行
    await testFn(window);
  } finally {
    // テスト完了後にアプリを終了
    if (electronApp) {
      await electronApp.close();
    }
  }
};

// アプリが正しく起動するかテスト
test('アプリが正しく起動すること', async () => {
  await runTest(async (window) => {
    // ページがロードされるまで待機
    await window.waitForLoadState('domcontentloaded');
    
    // タイトルが正しく表示されているか確認
    const title = await window.title();
    expect(title).toContain('Electron React TypeScript App');

    // 見出しが表示されているか確認
    const heading = await window.locator('h1').textContent();
    expect(heading).toBe('バイト数を入力してください');
  });
});

// ファイルサイズ入力機能のテスト
test('ファイルサイズを入力してフォーマットされた結果が表示されること', async () => {
  await runTest(async (window) => {
    // ページがロードされるまで待機
    await window.waitForLoadState('domcontentloaded');
    
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    
    // 入力フィールドが表示されているか確認
    await expect(input).toBeVisible();
    
    // 1024バイトを入力
    await input.fill('1024');
    
    // フォーマットされた結果が表示されるまで待機
    await expect(window.locator('text=1 KB')).toBeVisible({ timeout: 3000 });
  });
});

// 大きな数値のテスト
test('大きなファイルサイズを入力した場合も正しく表示されること', async () => {
  await runTest(async (window) => {
    // ページがロードされるまで待機
    await window.waitForLoadState('domcontentloaded');
    
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    
    // 1GB相当の値を入力
    await input.fill('1073741824'); // 1024 * 1024 * 1024
    
    // フォーマットされた結果が表示されるまで待機
    await expect(window.locator('text=1 GB')).toBeVisible({ timeout: 3000 });
  });
});

// 0バイトのテスト
test('0バイトを入力した場合も正しく表示されること', async () => {
  await runTest(async (window) => {
    // ページがロードされるまで待機
    await window.waitForLoadState('domcontentloaded');
    
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    
    // 0を入力
    await input.fill('0');
    
    // フォーマットされた結果が表示されるまで待機
    await expect(window.locator('text=0 Bytes')).toBeVisible({ timeout: 3000 });
  });
});