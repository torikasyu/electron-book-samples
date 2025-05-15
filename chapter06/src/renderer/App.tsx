import React, { useState } from 'react';
import { FileSizeViewer } from './components/fileSizeViewer';

const App: React.FC = () => {
  const [fileSize, setFileSize] = useState<number>(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ファイルサイズ表示アプリ</h1>
      <input type="number" onChange={(e) => setFileSize(Number(e.target.value))} />
      <FileSizeViewer bytes={fileSize} />
    </div>
  );
};

export default App;
