import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import SettingsModal from './components/SettingsModal';
import EditImageModal from './components/EditImageModal';
import { ImageInfo } from '../shared/types';

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  // 状態管理
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [uploadTags, setUploadTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // コンポーネントがマウントされたときに画像を読み込む
  useEffect(() => {
    loadImages();
    checkConfiguration();
  }, []);

  // 設定が正しく行われているか確認する関数
  const checkConfiguration = async () => {
    try {
      const config = await window.electronAPI.config.get();
      if (!config.supabaseUrl || !config.supabaseAnonKey) {
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
      const result = await window.electronAPI.images.getAll();
      if (result.success) {
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
      const result = await window.electronAPI.images.upload(uploadTags);
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
  const handleDelete = async (imageId: string, fileName: string) => {
    if (!confirm('この画像を削除してもよろしいですか？')) return;

    try {
      const result = await window.electronAPI.images.delete(imageId, fileName);
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

  // 画像編集モーダルを開く関数
  const handleEdit = (image: ImageInfo) => {
    setSelectedImage(image);
    setIsEditModalOpen(true);
  };

  // 画像情報を更新する関数
  const handleSaveImage = async (imageId: string, updates: Partial<ImageInfo>) => {
    try {
      const result = await window.electronAPI.images.update(imageId, updates);
      if (result.success) {
        await loadImages();
      } else {
        setError(result.message || '画像の更新に失敗しました');
      }
    } catch (error) {
      console.error('画像の更新に失敗しました:', error);
      setError('画像の更新に失敗しました');
      throw error; // モーダルでエラーハンドリングするために再スロー
    }
  };

  // アップロード用のタグを追加する関数
  const addUploadTag = () => {
    if (newTag.trim() && !uploadTags.includes(newTag.trim())) {
      setUploadTags([...uploadTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // アップロード用のタグを削除する関数
  const removeUploadTag = (tagToRemove: string) => {
    setUploadTags(uploadTags.filter(tag => tag !== tagToRemove));
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
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              className="form-control"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="タグを追加"
              style={{ flex: 1 }}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUploadTag())}
            />
            <button 
              className="btn btn-primary"
              onClick={addUploadTag}
            >
              タグを追加
            </button>
          </div>
          <div className="tag-list" style={{ marginBottom: '10px' }}>
            {uploadTags.map((tag, index) => (
              <span key={index} className="tag" style={{ display: 'inline-flex', alignItems: 'center' }}>
                {tag}
                <button
                  type="button"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    marginLeft: '5px',
                    fontSize: '12px',
                    color: 'red'
                  }}
                  onClick={() => removeUploadTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <EditImageModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        image={selectedImage}
        onSave={handleSaveImage}
      />
    </div>
  );
};

export default App;