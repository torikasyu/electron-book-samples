import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import SettingsModal from './components/SettingsModal';
import { ImageInfo, ImageUploadResult, ImageListResult, ImageDeleteResult } from '../shared/types';

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  // 状態管理
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // コンポーネントがマウントされたときに設定のチェックと画像読み込みを行う
  useEffect(() => {
    checkConfiguration();
    loadImages();
  }, []);

  // 設定が正しく行われているか確認する関数
  const checkConfiguration = async () => {
    try {
      const config = await window.electronAPI.config.get();
      if (!config.supabaseUrl || !config.supabaseAnonKey || !config.supabaseBucket) {
        setIsSettingsModalOpen(true);
      }
    } catch (error) {
      console.error('設定の確認に失敗しました:', error);
      setError('設定の確認に失敗しました。設定を確認してください。');
    }
  };

  // 画像を読み込む関数
  const loadImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result: ImageListResult = await window.electronAPI.images.getAll();
      if (result.success && result.data) {
        setImages(result.data);
      } else {
        setError(result.message || '画像の読み込みに失敗しました');
      }
    } catch (error) {
      console.error('画像の読み込みに失敗しました:', error);
      setError('画像の読み込みに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 画像をアップロードする関数
  const handleUpload = async () => {
    try {
      const result: ImageUploadResult = await window.electronAPI.images.upload();
      if (result.success) {
        await loadImages();
      } else {
        setError(result.message || '画像のアップロードに失敗しました');
      }
    } catch (error) {
      console.error('画像のアップロードに失敗しました:', error);
      setError('画像のアップロードに失敗しました');
    }
  };

  // 画像を削除する関数
  const handleDelete = async (fileName: string) => {
    if (!confirm('この画像を削除してもよろしいですか？')) return;

    try {
      const result: ImageDeleteResult = await window.electronAPI.images.delete(fileName);
      if (result.success) {
        await loadImages();
      } else {
        setError(result.message || '画像の削除に失敗しました');
      }
    } catch (error) {
      console.error('画像の削除に失敗しました:', error);
      setError('画像の削除に失敗しました');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>画像管理アプリ</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            設定
          </button>
        </div>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '15px' }}>画像をアップロード</h2>
        <div style={{ marginBottom: '15px' }}>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={isLoading}
          >
            画像を選択してアップロード
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>読み込み中...</p>
        </div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>画像がありません。画像をアップロードしてください。</p>
        </div>
      ) : (
        <div className="image-grid">
          {images.map(image => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default App;