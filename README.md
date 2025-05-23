# Electron入門書 サンプルコード

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

このリポジトリには、Electron入門書で紹介されているサンプルアプリケーションのソースコードが含まれています。各章ごとに異なるアプリケーションや技術トピックを扱い、段階的にElectron、React、TypeScriptの知識を深めていきます。

> **Note**  
> このリポジトリのコードはmacOSで作成・動作確認を行っています。他のOSでの動作は確認しておりませんのでご了承ください。


## 必要な環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上
- Git

## セットアップ手順

1. リポジトリをクローン
   ```bash
   git clone https://github.com/your-username/electron-book-samples.git
   cd electron-book-samples
   ```

2. 各章のディレクトリに移動
   ```bash
   cd chapter03
   ```

3. 依存関係のインストール
   ```bash
   npm install
   ```

4. アプリケーションの起動
   ```bash
   npm run dev
   ```

## 各章の構成

### 開発環境構築 (chapter03)
- プロジェクトの初期化
- 必要なパッケージのインストール
- 設定ファイルの作成と説明
- プロジェクト構造の解説

### 基本的なアプリケーション開発 (chapter04)
- Hello Worldアプリ
- メインプロセスとレンダラープロセスの理解
- IPCを使ったプロセス間通信

### ToDoアプリの作成 (chapter05)
- 関数ベースの設計
- React Hooksを使った状態管理
- ローカルストレージの利用

### 画像管理アプリの作成 (chapter06)
- クリーンアーキテクチャの実践
- Supabase Storageの利用
- 画像のアップロード・ダウンロード機能

### Electronアプリのテスト (chapter07)
- テスト環境のセットアップ
- ユニットテスト
- E2Eテスト

### Electronアプリのビルド・CD/CI (chapter08)
- 各プラットフォーム向けのビルド設定
- パッケージング
- 自動アップデート機能の実装
- GitHub Actionsを使ったElectronアプリのCD/CI

## コントリビューション

バグの報告や機能の提案、プルリクエストは大歓迎です。以下のガイドラインに従ってください。

1. イシューを作成して、変更内容を説明してください
2. 機能ブランチを作成して変更を加えてください
3. プルリクエストを作成してください

## トラブルシューティング

### 依存関係の問題

問題が発生した場合は、依存関係を再インストールしてください：

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### デバッグ

デベロッパーツールを開くには：
- アプリケーション起動後、`Cmd+Option+I` (Mac) または `Ctrl+Shift+I` (Windows/Linux) を押す
- または、メニューバーから「View」>「Toggle Developer Tools」を選択

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 著者

- Hiroki Tanaka - [@torikasyu](https://twitter.com/torikasyu)

## 免責事項

このリポジトリのコードは、学習目的で提供されているものです。このコードを使用したことにより生じたいかなる損害（直接損害、間接損害、特別損害、結果的損害、使用不能、データの損失、利益の損失、業務の中断など）について、いかなる責任も負いかねます。

このコードを使用する場合は、自己責任で行ってください。本番環境での利用前に、必ず十分なテストと検証を行ってください。