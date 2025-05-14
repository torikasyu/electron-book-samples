import React, { useState } from 'react';
import { ImageInfo } from '../../shared/types';

interface ImageCardProps {
  image: ImageInfo;
  onDelete: (name: string) => void;
}

/**
 * 画像カードコンポーネント
 */
const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  // コピー成功メッセージの表示状態
  const [showCopied, setShowCopied] = useState(false);
  
  // ファイルサイズをフォーマットする関数
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // 日付をフォーマットする関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // URLをクリップボードにコピーする関数
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(image.url).then(() => {
      // コピー成功メッセージを表示
      setShowCopied(true);
      // 2秒後にメッセージを非表示にする
      setTimeout(() => setShowCopied(false), 2000);
    }).catch(err => {
      console.error('クリップボードへのコピーに失敗しました:', err);
    });
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img src={image.url} alt={image.name} />
      </div>
      <div className="image-info">
        <h3 className="image-name">{image.name}</h3>
        <div className="image-meta">
          <div>{formatFileSize(image.size)}</div>
          <div>{formatDate(image.createdAt)}</div>
        </div>

        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={copyUrlToClipboard}
            style={{ marginRight: '8px' }}
          >
            URLをコピー
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(image.name)}
          >
            削除
          </button>
          {showCopied && (
            <div style={{
              position: 'absolute',
              bottom: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 1000,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              URLをコピーしました
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;