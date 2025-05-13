import React, { useState, useEffect } from 'react';
import { ImageInfo } from '../../shared/types';

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageInfo | null;
  onSave: (imageId: string, updates: Partial<ImageInfo>) => Promise<void>;
}

/**
 * 画像編集モーダルコンポーネント
 */
const EditImageModal: React.FC<EditImageModalProps> = ({ isOpen, onClose, image, onSave }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 画像情報が変更されたときにフォームを更新
  useEffect(() => {
    if (image) {
      setName(image.name);
      setTags(image.tags || []);
    }
  }, [image]);

  // タグを追加する関数
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  // タグを削除する関数
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // フォームを送信する関数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    try {
      setIsSaving(true);
      await onSave(image.id, {
        name,
        tags
      });
      onClose();
    } catch (error) {
      console.error('画像の更新に失敗しました:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen || !image) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">画像情報の編集</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="image-preview" style={{ marginBottom: '15px' }}>
              <img 
                src={image.url} 
                alt={image.name} 
                style={{ maxWidth: '100%', maxHeight: '200px', display: 'block', margin: '0 auto' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageName">ファイル名</label>
              <input
                type="text"
                id="imageName"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>タグ</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="新しいタグを追加"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={addTag}
                >
                  追加
                </button>
              </div>
              <div className="tag-list">
                {tags.map((tag, index) => (
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
                      onClick={() => removeTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>キャンセル</button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImageModal;