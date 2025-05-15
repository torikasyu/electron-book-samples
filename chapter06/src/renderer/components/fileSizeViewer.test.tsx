import { render, screen } from '@testing-library/react';
import { FileSizeViewer } from './FileSizeViewer';

describe('FileSizeViewer', () => {
  // 基本的な表示テスト
  test('正しくレンダリングされること', () => {
    // コンポーネントをレンダリング
    render(<FileSizeViewer fileSize={1536} readableFileSize="1.5 KB" />);
    
    // Prosで渡した値が見出しと共に表示されていることを確認
    expect(screen.getByText('バイト数: 1536')).toBeInTheDocument();
    expect(screen.getByText('読みやすい表示: 1.5 KB')).toBeInTheDocument();
  });
});
