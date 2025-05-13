# Electron + React + TypeScript サンプルアプリケーション

これは、Electron、React、TypeScriptを使用した基本的なカウンターアプリケーションのサンプルです。

## 機能

- シンプルなカウンターアプリケーション
- カウントアップとリセット機能
- Electron + React + TypeScriptの基本的な構成

## 必要条件

- Node.js (バージョン 14.x 以上)
- npm (バージョン 6.x 以上)

## インストール

リポジトリをクローンした後、以下のコマンドを実行して依存関係をインストールします：

```bash
npm install
```

## 開発

開発モードでアプリケーションを実行するには、以下のコマンドを実行します：

```bash
npm run dev
```

このコマンドは、Webpackを使用してファイルをビルドし、Electronアプリケーションを起動します。ファイルを変更すると、自動的に再ビルドされます。

## ビルド

アプリケーションをビルドするには、以下のコマンドを実行します：

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

## 実行

ビルド後、アプリケーションを実行するには、以下のコマンドを実行します：

```bash
npm start
```

## プロジェクト構造

```
electron-react-typescript/
├── src/                      # ソースコード
│   ├── main/                 # メインプロセス関連のコード
│   │   └── main.ts           # メインプロセスのエントリーポイント
│   └── renderer/             # レンダラープロセス関連のコード
│       ├── components/       # UIコンポーネント
│       ├── App.tsx           # メインのReactコンポーネント
│       ├── index.html        # HTMLテンプレート
│       └── index.tsx         # レンダラープロセスのエントリーポイント
├── config/                   # 設定ファイル
│   ├── webpack.main.js       # メインプロセス用Webpack設定
│   └── webpack.renderer.js   # レンダラープロセス用Webpack設定
├── .eslintrc.js              # ESLint設定
├── .prettierrc               # Prettier設定
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
└── webpack.config.js         # Webpack設定
```

## ライセンス

MIT