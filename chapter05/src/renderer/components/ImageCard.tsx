import React from 'react';
import { ImageInfo } from '../../shared/types';

interface ImageCardProps {
  image: ImageInfo;
  onDelete: (name: string) => void;
}

/**
 * 画像カードコンポーネント
 */
const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
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
            className="btn btn-danger"
            onClick={() => onDelete(image.name)}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;