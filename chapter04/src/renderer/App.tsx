import React, { useState, useEffect } from 'react';
import './styles.css';
import { SystemInfo, FileInfo } from '../shared/types';

const App: React.FC = () => {
  // 選択されたファイル情報を保持するstate
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  
  // システム情報を保持するstate
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  
  // システム情報を読み込み中かどうかを示すstate
  const [loading, setLoading] = useState<boolean>(false);

  // ファイル選択ダイアログを開き、ファイル情報を取得する関数
  const handleFileOpen = async () => {
    try {
      const info = await window.electronAPI.openFile();
      if (info) {
        setFileInfo(info);
      }
    } catch (error) {
      console.error('ファイル選択エラー:', error);
    }
  };

  // システム情報を取得する関数
  const handleGetSystemInfo = async () => {
    setLoading(true);
    try {
      const info = await window.electronAPI.getSystemInfo();
      setSystemInfo(info);
    } catch (error) {
      console.error('システム情報取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Electron IPC通信サンプル</h1>
      
      <section className="section">
        <h2>ファイル選択</h2>
        <button onClick={handleFileOpen}>ファイルを選択</button>
        {fileInfo && (
          <div className="result-box">
            <h3>ファイル情報</h3>
            <p>パス: {fileInfo.path}</p>
            <p>サイズ: {(fileInfo.size / 1024).toFixed(2)} KB</p>
            <p>作成日時: {new Date(fileInfo.created).toLocaleString()}</p>
            <p>最終更新日時: {new Date(fileInfo.modified).toLocaleString()}</p>
            <p>最終アクセス日時: {new Date(fileInfo.accessed).toLocaleString()}</p>
            <p>タイプ: {fileInfo.isDirectory ? 'ディレクトリ' : 'ファイル'}</p>
            <p>権限:</p>
            <ul>
              <li>読み取り: {fileInfo.permissions.readable ? '可' : '不可'}</li>
              <li>書き込み: {fileInfo.permissions.writable ? '可' : '不可'}</li>
              <li>実行: {fileInfo.permissions.executable ? '可' : '不可'}</li>
            </ul>
          </div>
        )}
      </section>
      
      <section className="section">
        <h2>システム情報</h2>
        <button onClick={handleGetSystemInfo} disabled={loading}>
          {loading ? '読み込み中...' : 'システム情報を取得'}
        </button>
        
        {systemInfo && (
          <div className="result-box">
            <h3>システム情報</h3>
            <p>プラットフォーム: {systemInfo.platform}</p>
            <p>アーキテクチャ: {systemInfo.arch}</p>
            <p>CPU: {systemInfo.cpus[0]?.model}</p>
            <p>コア数: {systemInfo.cpus.length}</p>
            <p>メモリ合計: {Math.round(systemInfo.memory.total / (1024 * 1024 * 1024))} GB</p>
            <p>空きメモリ: {Math.round(systemInfo.memory.free / (1024 * 1024 * 1024))} GB</p>
            <p>稼働時間: {Math.floor(systemInfo.uptime / 3600)} 時間 {Math.floor((systemInfo.uptime % 3600) / 60)} 分</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;