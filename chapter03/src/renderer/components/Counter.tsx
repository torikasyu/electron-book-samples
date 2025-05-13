import React from 'react';

/**
 * Counterコンポーネントのプロパティ
 */
interface CounterProps {
  count: number;
  onIncrement: () => void;
  onReset: () => void;
}

/**
 * カウンターコンポーネント
 */
const Counter: React.FC<CounterProps> = ({ count, onIncrement, onReset }) => {
  return (
    <div style={styles.container}>
      <div style={styles.countDisplay}>
        <h2>カウンター: {count}</h2>
      </div>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={onIncrement}
        >
          カウントアップ
        </button>
        <button 
          style={styles.resetButton} 
          onClick={onReset}
        >
          リセット
        </button>
      </div>
    </div>
  );
};

// スタイル定義
const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  countDisplay: {
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resetButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Counter;