import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileSizeViewer } from './fileSizeViewer';
import * as formatModule from '../utils/getFormattedFileSize';

// getFormattedFileSizeをモック化するためのセットアップ
jest.mock('../utils/getFormattedFileSize', () => ({
  getFormattedFileSize: jest.fn()
}));

describe('FileSizeViewer', () => {
  // 各テスト前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 基本的な表示テスト
  test('正しくレンダリングされること', () => {
    // モック関数の戻り値を設定
    jest.spyOn(formatModule, 'getFormattedFileSize').mockReturnValue('1.5 KB');
    
    // コンポーネントをレンダリング
    render(<FileSizeViewer bytes={1500} />);
    
    // フォーマットされたサイズが表示されていることを確認
    expect(screen.getByText('読みやすい表示: 1.5 KB')).toBeInTheDocument();
    
    // getFormattedFileSize関数が正しい引数で呼び出されたことを確認
    expect(formatModule.getFormattedFileSize).toHaveBeenCalledWith(1500);
  });

  // 0バイトの場合のテスト
  test('0バイトの場合も正しく表示されること', () => {
    // モック関数の戻り値を設定
    jest.spyOn(formatModule, 'getFormattedFileSize').mockReturnValue('0 Bytes');
    
    // コンポーネントをレンダリング
    render(<FileSizeViewer bytes={0} />);
    
    // フォーマットされたサイズが表示されていることを確認
    expect(screen.getByText('読みやすい表示: 0 Bytes')).toBeInTheDocument();
    
    // getFormattedFileSize関数が正しい引数で呼び出されたことを確認
    expect(formatModule.getFormattedFileSize).toHaveBeenCalledWith(0);
  });

  // 大きなサイズの場合のテスト
  test('大きなサイズの場合も正しく表示されること', () => {
    // モック関数の戻り値を設定
    jest.spyOn(formatModule, 'getFormattedFileSize').mockReturnValue('1.43 GB');
    
    // コンポーネントをレンダリング
    render(<FileSizeViewer bytes={1500000000} />);
    
    // フォーマットされたサイズが表示されていることを確認
    expect(screen.getByText('読みやすい表示: 1.43 GB')).toBeInTheDocument();
    
    // getFormattedFileSize関数が正しい引数で呼び出されたことを確認
    expect(formatModule.getFormattedFileSize).toHaveBeenCalledWith(1500000000);
  });
});
