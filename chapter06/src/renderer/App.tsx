import React, { useState } from 'react';
import { FileSizeViewer } from './components/fileSizeViewer';

const App: React.FC = () => {
  const [fileSize, setFileSize] = useState<number>(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>バイト数を入力してください</h1>
      <input 
        type="number" 
        onChange={(e) => setFileSize(Number(e.target.value))} 
        aria-label="バイト数入力"
        data-testid="file-size-input"
      />
      <FileSizeViewer bytes={fileSize} />
    </div>
  );
};

export default App;
