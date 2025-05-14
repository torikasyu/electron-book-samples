# Electron + React + TypeScript + webpack 最小サンプル

React、Electron、TypeScript、webpackを組み合わせた最小構成のサンプルアプリケーションです。

## セットアップ

```bash
cd electron-react-sample
npm install
```

## 開発

### ビルド
```bash
npm run build
```

### 開発モード（ビルド後にElectronを起動）
```bash
npm run dev
```

### ファイル監視モード（開発時推奨）
```bash
# ターミナル1: webpackでファイル監視
npm run watch

# ターミナル2: Electronアプリ起動
npm start
```

## プロジェクト構成

```
electron-react-sample/
├── package.json          # パッケージ設定
├── tsconfig.json         # TypeScript設定
├── webpack.config.js     # webpack設定（メイン・レンダラー）
├── src/
│   ├── main/
│   │   └── main.ts       # Electronメインプロセス
│   ├── renderer/
│   │   ├── index.html    # HTMLテンプレート
│   │   ├── index.tsx     # Reactエントリポイント
│   │   └── App.tsx       # メインコンポーネント
│   └── types/
│       └── global.d.ts   # グローバル型定義
└── dist/                 # ビルド出力先
    ├── main.js
    └── renderer/
```

## 主な特徴

- **最小構成**: 必要最小限のファイルで構成
- **TypeScript**: 型安全なコード記述
- **webpack**: メインプロセスとレンダラープロセスを個別にバンドル
- **React**: モダンなReact 18を使用
- **セキュア**: `nodeIntegration: false`, `contextIsolation: true`で設定

## カスタマイズポイント

- `src/main/main.ts`: Electronメインプロセスの処理
- `src/renderer/App.tsx`: Reactアプリケーションのメインコンポーネント
- `webpack.config.js`: バンドル設定（CSS、画像等の追加も可能）
- `tsconfig.json`: TypeScriptコンパイル設定
