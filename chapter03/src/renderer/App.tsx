import React, { useState } from 'react';
import Counter from './components/Counter';

/**
 * アプリケーションのメインコンポーネント
 */
const App: React.FC = () => {
  // カウンター用のステート
  const [count, setCount] = useState<number>(0);

  // カウントアップ関数
  const incrementCount = (): void => {
    setCount((prevCount) => prevCount + 1);
  };

  // リセット関数
  const resetCount = (): void => {
    setCount(0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Electron + React + TypeScript サンプル</h1>
      <p style={styles.description}>
        これは、Electron、React、TypeScriptを使用したシンプルなカウンターアプリケーションです。
      </p>
      <Counter 
        count={count} 
        onIncrement={incrementCount} 
        onReset={resetCount} 
      />
    </div>
  );
};

// スタイル定義
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    color: '#333',
    textAlign: 'center' as const,
  },
  description: {
    color: '#666',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
};

export default App;