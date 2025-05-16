# Electron + React + TypeScript + webpack サンプルアプリ

React、Electron、TypeScript、webpackを組み合わせたファイルサイズ表示アプリケーションです。

## セットアップ

```bash
cd chapter06
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

### テスト実行

#### ユニットテスト（Jest）
```bash
npm test
```

#### E2Eテスト（Playwright）
```bash
# ビルド後にE2Eテストを実行
npm run build
npm run e2e
```

## プロジェクト構成

```
chapter06/
├── package.json          # パッケージ設定
├── tsconfig.json         # TypeScript設定
├── tsconfig.test.json    # テスト用TypeScript設定
├── jest.config.js        # Jestの設定
├── webpack.config.js     # webpack設定（メイン・レンダラー）
├── src/
│   ├── main/
│   │   └── main.ts       # Electronメインプロセス
│   ├── renderer/
│   │   ├── App.tsx       # メインコンポーネント
│   │   ├── index.html    # HTMLテンプレート
│   │   ├── index.tsx     # Reactエントリポイント
│   │   ├── components/
│   │   │   ├── fileSizeViewer.tsx       # ファイルサイズ表示コンポーネント
│   │   │   └── fileSizeViewer.test.tsx  # コンポーネントのテスト
│   │   └── utils/
│   │       ├── getFormattedFileSize.ts      # ファイルサイズ変換ユーティリティ
│   │       └── getFormattedFileSize.test.ts # ユーティリティのテスト
│   ├── e2e/
│   │   ├── app.e2e-test.ts     # E2Eテスト
│   │   └── playwright.config.ts # Playwright設定
│   ├── setupTests.ts     # テスト設定
│   └── types/
│       └── global.d.ts   # グローバル型定義
└── dist/                 # ビルド出力先
    ├── main.js
    └── renderer/
```

## 主な特徴

- **TypeScript**: 型安全なコード記述
- **React**: モダンなReact 18を使用
- **テスト**: Jest（ユニットテスト）とPlaywright（E2Eテスト）を導入
- **webpack**: メインプロセスとレンダラープロセスを個別にバンドル
- **セキュア**: `nodeIntegration: false`, `contextIsolation: true`で設定

## カスタマイズポイント

- `src/main/main.ts`: Electronメインプロセスの処理
- `src/renderer/App.tsx`: Reactアプリケーションのメインコンポーネント
- `src/renderer/components/`: UIコンポーネント
- `src/renderer/utils/`: ユーティリティ関数
- `src/e2e/`: E2Eテスト
- `webpack.config.js`: バンドル設定（CSS、画像等の追加も可能）
- `jest.config.js`: Jestテスト設定
- `tsconfig.json`: TypeScriptコンパイル設定
