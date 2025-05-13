import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Reactアプリケーションのルート要素を作成
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Appコンポーネントをレンダリング
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);