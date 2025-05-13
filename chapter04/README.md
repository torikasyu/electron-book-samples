# Electron IPC通信サンプルアプリケーション

このプロジェクトは、Electron、React、TypeScriptを使用して、IPC（プロセス間通信）の基本的な使い方を示すサンプルアプリケーションです。

## 機能

このアプリケーションには以下の機能が含まれています：

1. **ファイル選択ダイアログ** - メインプロセスのElectron APIを使用してファイル選択ダイアログを表示し、選択されたファイルパスをレンダラープロセスに返します。
2. **システム情報表示** - メインプロセスからシステム情報（OS、CPU、メモリ、稼働時間など）を取得して表示します。

## 技術スタック

- **Electron**: デスクトップアプリケーションフレームワーク
- **React**: UIライブラリ
- **TypeScript**: 型安全な開発言語
- **Webpack**: モジュールバンドラー

## プロジェクト構造

```
chapter04/
├── config/                   # 設定ファイル
│   ├── webpack.main.js       # メインプロセス用Webpack設定
│   └── webpack.renderer.js   # レンダラープロセス用Webpack設定
├── src/                      # ソースコード
│   ├── main/                 # メインプロセス関連のコード
│   │   ├── main.ts           # メインプロセスのエントリーポイント
│   │   └── preload.ts        # プリロードスクリプト（コンテキスト分離用）
│   ├── renderer/             # レンダラープロセス関連のコード
│   │   ├── components/       # UIコンポーネント
│   │   ├── types/            # 型定義
│   │   │   └── electron.d.ts # Electron APIの型定義
│   │   ├── App.tsx           # メインのReactコンポーネント
│   │   ├── index.html        # HTMLテンプレート
│   │   ├── index.tsx         # レンダラープロセスのエントリーポイント
│   │   └── styles.css        # スタイルシート
│   └── shared/               # 共有コード
│       └── types.ts          # 共有型定義
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
└── webpack.config.js         # Webpack設定
```

## 重要なコンセプト

### コンテキスト分離（Context Isolation）

このアプリケーションでは、セキュリティを向上させるために「コンテキスト分離」を使用しています。これにより、レンダラープロセスからNode.jsのAPIに直接アクセスできなくなり、preloadスクリプトを介して明示的に公開されたAPIのみを使用できます。

### IPC通信

Electronでは、メインプロセスとレンダラープロセス間の通信にIPCを使用します。このアプリケーションでは以下のIPC通信パターンを示しています：

- **invoke/handle**: レンダラーからメインプロセスへの要求と応答（Promise形式）
- **contextBridge**: preloadスクリプトを使用してAPIを安全に公開

## 実行方法

1. 依存関係をインストール：
```bash
npm install
```

2. アプリケーションをビルド：
```bash
npm run build
```

3. アプリケーションを実行：
```bash
npm start
```

開発モードで実行（ファイル変更時に自動再ビルド）：
```bash
npm run dev
```

## 学習ポイント

- Electronのメインプロセスとレンダラープロセスの役割分担
- preloadスクリプトを使用したセキュアなIPC通信
- TypeScriptによる型安全なElectron開発
- ReactとElectronの統合方法

## ライセンス

MIT