import React from 'react';
import { ImageInfo } from '../../shared/types';

interface ImageCardProps {
  image: ImageInfo;
  onDelete: (id: string, name: string) => void;
  onEdit: (image: ImageInfo) => void;
}

/**
 * 画像カードコンポーネント
 */
const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete, onEdit }) => {
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
        {image.tags && image.tags.length > 0 && (
          <div className="tag-list">
            {image.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => onEdit(image)}
          >
            編集
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(image.id, image.name)}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;