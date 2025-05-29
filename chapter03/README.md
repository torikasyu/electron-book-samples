# Electron + React + TypeScript + webpack 開発環境

この章では、Electronアプリケーション開発のための基本的な開発環境を構築します。

- React 18 + TypeScript + webpack 5 を使用したモダンな開発環境
- メインプロセスとレンダラープロセスの分離
- セキュアなデフォルト設定

## 動作環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上

## セットアップ

1. リポジトリをクローン（まだの場合）

   ```bash
   git clone https://github.com/torikasyu/electron-book-samples.git
   cd electron-book-samples
   ```

2. 依存関係のインストール

   ```bash
   cd chapter03
   npm install
   ```

### 推奨開発環境

- [Visual Studio Code](https://code.visualstudio.com/)
  - 拡張機能:
    - ESLint
    - Prettier
    - TypeScript Vue Plugin (Volar)

## 開発手順

### 開発モード

開発用にビルドしてElectronを起動します。

```bash
# 開発モードで起動
npm run dev
```

### ビルド

```bash
# ビルドの実行
npm run build
```

```bash
# ビルド済みアプリを実行
npm start
```

## プロジェクト構成

```
chapter03/
├── package.json          # パッケージ設定とスクリプト
├── tsconfig.json         # TypeScript設定
├── webpack.config.js     # webpack設定
├── src/
│   ├── main/             # メインプロセス（Node.js）
│   │   └── main.ts       # エントリーポイント
│   └── renderer/         # レンダラープロセス（ブラウザ）
│       ├── index.html    # HTMLテンプレート
│       ├── index.tsx     # Reactエントリポイント
│       └── App.tsx       # メインコンポーネント
└── dist/                 # ビルド出力先
    ├── main.js           # コンパイルされたメインプロセス
    └── renderer/         # バンドルされたレンダラーファイル
```

## カスタマイズポイント

1. **メインプロセスの編集**
   - `src/main/main.ts`: Electronのメインプロセスを記述
   - 新しいウィンドウの作成や、アプリケーションのライフサイクルを管理

2. **レンダラープロセスの編集**
   - `src/renderer/App.tsx`: メインのReactコンポーネント
   - `src/renderer/index.html`: アプリケーションのHTMLテンプレート

3. **設定のカスタマイズ**
   - `webpack.config.js`: ビルド設定のカスタマイズ
   - `tsconfig.json`: TypeScriptのコンパイルオプションの調整