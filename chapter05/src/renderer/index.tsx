import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// ルート要素を取得し、Reactのルートを作成
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}