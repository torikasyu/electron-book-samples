import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import type { ElectronApplication } from 'playwright';
import * as path from 'path';

let electronApp: ElectronApplication | undefined;
const appPath = path.join(__dirname, '../../dist/main.js');

test.describe('E2Eテスト', () => {
  let window: any;

  test.beforeAll(async () => {
    electronApp = await electron.launch({
      args: [appPath],
    });
    
    if (!electronApp) {
      throw new Error('Electronアプリケーションが起動できませんでした');
    }

    // アプリが起動したら、ウィンドウが読み込まれるのを待機
    window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');
  });

  test.afterAll(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });

  test('アプリが正しく起動し、タイトルと見出しが正しいこと', async () => {
    // タイトルが正しく表示されているか確認
    const title = await window.title();
    expect(title).toContain('Electron React TypeScript App');

    // 見出しが表示されているか確認
    const heading = await window.locator('h1').textContent();
    expect(heading).toBe('バイト数を入力してください');
  });

  test('ファイルサイズを入力してフォーマットされた結果が表示されること', async () => {
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    // 入力フィールドが表示されているか確認
    await expect(input).toBeVisible();
    // 1024バイトを入力
    await input.fill('1024');
    // バイト数表示を取得
    const bytesDisplay = window.locator('[data-testid="file-size-bytes"]');
    // 読みやすい表示を取得
    const readableDisplay = window.locator('[data-testid="file-size-readable"]');

    await expect(bytesDisplay).toHaveText('バイト数: 1024');
    await expect(readableDisplay).toHaveText('読みやすい表示: 1 KB');
  });

  // 大きな数値のテスト
  test('大きなファイルサイズを入力した場合も正しく表示されること', async () => {
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    // 1GB相当の値を入力
    await input.fill('1073741824'); // 1024 * 1024 * 1024
    // バイト数表示を取得
    const bytesDisplay = window.locator('[data-testid="file-size-bytes"]');
    // 読みやすい表示を取得
    const readableDisplay = window.locator('[data-testid="file-size-readable"]');

    await expect(bytesDisplay).toHaveText('バイト数: 1073741824');
    await expect(readableDisplay).toHaveText('読みやすい表示: 1 GB');
  });

  // 0バイトのテスト
  test('0バイトを入力した場合も正しく表示されること', async () => {
    // 入力フィールドを取得
    const input = window.locator('[data-testid="file-size-input"]');
    // 0を入力
    await input.fill('0');
    // バイト数表示を取得
    const bytesDisplay = window.locator('[data-testid="file-size-bytes"]');
    // 読みやすい表示を取得
    const readableDisplay = window.locator('[data-testid="file-size-readable"]');

    await expect(bytesDisplay).toHaveText('バイト数: 0');
    await expect(readableDisplay).toHaveText('読みやすい表示: 0 Bytes');
  });
});