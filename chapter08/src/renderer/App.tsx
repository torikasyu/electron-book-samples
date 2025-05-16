import React, { useState } from 'react';
import { FileSizeViewer } from './components/FileSizeViewer';
import { getFormattedFileSize } from './utils/getFormattedFileSize';

const App: React.FC = () => {
  const [fileSize, setFileSize] = useState<number>(0);
  const [readableFileSize, setReadableFileSize] = useState<string>('');

  const handleInputChange = (target: number) => {
    setFileSize(target);
    setReadableFileSize(getFormattedFileSize(target));
  };
    
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>バイト数を入力してください</h1>
      <input 
        type="number" 
        onChange={(e) => handleInputChange(Number(e.target.value))} 
        aria-label="バイト数入力"
        data-testid="file-size-input"
      />
      <FileSizeViewer fileSize={fileSize} readableFileSize={readableFileSize} />
    </div>
  );
};

export default App;
