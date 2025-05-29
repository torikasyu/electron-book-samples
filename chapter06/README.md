# Electronアプリのテストサンプル

Electron、React、TypeScriptを使用したデスクトップアプリケーションに対して、ユニットテストとE2Eテストを実装するサンプルです。

## テスト戦略

### ユニットテスト
- ユーティリティ関数のテスト
- コンポーネントのレンダリングテスト

### E2Eテスト
- Playwrightを使用したエンドツーエンドテスト
- 実際のアプリケーションの動作検証

## 技術スタック

- **フロントエンド**: React 18, TypeScript
- **バックエンド**: Electron 28
- **テスト**: Jest, React Testing Library, Playwright
- **ビルドツール**: Webpack 5

## 環境要件

- Node.js 18.0.0 以上
- npm 9.0.0 以上

## セットアップ

### 1. プロジェクトの移動

```bash
cd chapter06
```

### 2. 依存関係のインストール

```bash
npm install
```

## 開発手順

### 開発モードで起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

## テスト

### ユニットテスト

```bash
# ユニットテストを実行
npm test

# ウォッチモードでユニットテストを実行
npm run test:watch
```

### E2Eテスト

```bash
# ビルドしてE2Eテストを実行
npm run test:e2e

# ビルドしてデバッグモードでE2Eテストを実行
npm run test:e2e:debug
```

## プロジェクト構成

```
chapter06/
├── src/
│   ├── e2e/                  # E2Eテスト
│   │   ├── app.e2e-test.ts   # E2Eテストケース
│   │   └── playwright.config.ts  # Playwright設定
│   ├── main/                 # メインプロセス
│   │   └── main.ts           # メインプロセスのエントリーポイント
│   ├── renderer/             # レンダラープロセス
│   │   ├── components/       # Reactコンポーネント
│   │   │   └── FileSizeViewer.tsx  # ファイルサイズ表示コンポーネント
│   │   ├── utils/            # ユーティリティ関数
│   │   │   └── getFormattedFileSize.ts  # ファイルサイズフォーマット関数
│   │   ├── App.tsx           # メインのReactコンポーネント
│   │   ├── index.html        # メインのHTMLテンプレート
│   │   └── index.tsx         # レンダラーのエントリーポイント
│   └── setupTests.ts         # テストセットアップ
├── test-results/            # テスト結果の出力先
├── jest.config.js           # Jestの設定
├── package.json             # プロジェクト設定
├── tsconfig.json            # TypeScript設定
├── tsconfig.test.json       # テスト用TypeScript設定
└── webpack.config.js        # Webpack設定
```
