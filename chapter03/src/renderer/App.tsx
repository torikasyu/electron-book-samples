import React, { useState } from 'react';

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  // カウンター状態の管理（関数ベースの設計）
  const [count, setCount] = useState<number>(0);

  // カウントを増加させる関数
  const incrementCount = (): void => {
    setCount(prevCount => prevCount + 1);
  };

  // カウントをリセットする関数
  const resetCount = (): void => {
    setCount(0);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Electron + React + TypeScript サンプルアプリ</h1>
      
      <div style={{ marginTop: '20px' }}>
        <p>これは開発環境構築のサンプルアプリです。</p>
        <p>以下のボタンでカウンターを操作できます。</p>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '5px' 
      }}>
        <h2>カウンター: {count}</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={incrementCount}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            カウントアップ
          </button>
          
          <button 
            onClick={resetCount}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            リセット
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>開発環境の特徴</h3>
        <ul>
          <li>Electronによるデスクトップアプリ開発</li>
          <li>Reactによるコンポーネントベース設計</li>
          <li>TypeScriptによる型安全なコーディング</li>
          <li>関数ベースの設計（クラスを使用しない）</li>
          <li>Webpackによるモジュールバンドル</li>
        </ul>
      </div>
    </div>
  );
};

export default App;