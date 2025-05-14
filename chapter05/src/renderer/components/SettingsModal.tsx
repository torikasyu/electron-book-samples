import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 設定画面モーダルコンポーネント
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [supabaseBucket, setSupabaseBucket] = useState('images');
  const [isSaving, setIsSaving] = useState(false);

  // コンポーネントがマウントされたときに設定を読み込む
  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  // 設定を読み込む関数
  const loadSettings = async () => {
    try {
      const config = await window.electronAPI.config.get();
      setSupabaseUrl(config.supabaseUrl || '');
      setSupabaseAnonKey(config.supabaseAnonKey || '');
      setSupabaseBucket(config.supabaseBucket || 'images');
    } catch (error) {
      console.error('設定の読み込みに失敗しました:', error);
    }
  };

  // 設定を保存する関数
  const saveSettings = async () => {
    try {
      setIsSaving(true);
      await window.electronAPI.config.update({
        supabaseUrl,
        supabaseAnonKey,
        supabaseBucket
      });
      onClose();
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">アプリケーション設定</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="settings-section">
            <h3 className="settings-title">Supabase設定</h3>
            <div className="form-group">
              <label htmlFor="supabaseUrl">Supabase URL</label>
              <input
                type="text"
                id="supabaseUrl"
                className="form-control"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
              />
            </div>
            <div className="form-group">
              <label htmlFor="supabaseAnonKey">Supabase Anon Key</label>
              <input
                type="password"
                id="supabaseAnonKey"
                className="form-control"
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                placeholder="your-anon-key"
              />
            </div>
            <div className="form-group">
              <label htmlFor="supabaseBucket">Supabase Storage Bucket</label>
              <input
                type="text"
                id="supabaseBucket"
                className="form-control"
                value={supabaseBucket}
                onChange={(e) => setSupabaseBucket(e.target.value)}
                placeholder="images"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>キャンセル</button>
          <button
            className="btn btn-primary"
            onClick={saveSettings}
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;