import React, { useState } from 'react';
import { getFormattedFileSize } from './utils/imageUtils';

const App: React.FC = () => {
  const [formattedSize, setFormattedSize] = useState<string>('');

  const handleFormatFileSize = (bytes: number) => {
    const result = getFormattedFileSize(bytes);
    setFormattedSize(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Electron + React + TypeScript App</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>ファイルサイズ（bytes）</h2>
        <input type="number" onChange={(e) => handleFormatFileSize(Number(e.target.value))} />
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>ファイルサイズ（bytes）: {formattedSize}</p>
      </div>
    </div>
  );
};

export default App;
