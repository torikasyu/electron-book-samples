import '@testing-library/jest-dom';
import { getFormattedFileSize } from './getFormattedFileSize';

describe('getFormattedFileSize関数のテスト', () => {
  // 0バイトのテスト
  test('0バイトの場合は「0 Bytes」を返す', () => {
    expect(getFormattedFileSize(0)).toBe('0 Bytes');
  });

  // 負の値のテスト
  test('負の値の場合も適切に処理される', () => {
    expect(getFormattedFileSize(-1024)).toBe('0 Bytes');
  });

  // バイト単位のテスト
  test('1000バイトの場合はバイト単位で表示', () => {
    expect(getFormattedFileSize(1000)).toBe('1000 Bytes');
  });

  // キロバイト単位のテスト
  test('1500バイトの場合はKB単位で表示', () => {
    expect(getFormattedFileSize(1500)).toBe('1.46 KB');
  });

  // メガバイト単位のテスト
  test('1500000バイトの場合はMB単位で表示', () => {
    expect(getFormattedFileSize(1500000)).toBe('1.43 MB');
  });

  // ギガバイト単位のテスト
  test('1500000000バイトの場合はGB単位で表示', () => {
    expect(getFormattedFileSize(1500000000)).toBe('1.4 GB');
  });
});
