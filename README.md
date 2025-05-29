# Electron入門書 サンプルコード

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

このリポジトリには、Electron入門書で紹介されているサンプルアプリケーションのソースコードが含まれています。各章ごとに異なるアプリケーションや技術トピックを扱い、段階的にElectron、React、TypeScriptの知識を深めていきます。

> **Note**  
> このリポジトリのコードはmacOSで作成・動作確認を行っています。他のOSでの動作は確認しておりませんのでご了承ください。

## リポジトリ構成

```bash
electron-book-samples/
├── .github/            # GitHub Actions ワークフローファイル（第8章で利用）
├── chapter03/          # 第3章: 基本的なElectronアプリケーション
├── chapter04/          # 第4章: IPC通信の基本
├── chapter05/          # 第5章: 画像管理アプリ
├── chapter06/          # 第6章: テスト戦略と実装
├── chapter07/          # 第7章: アプリケーションのパッケージ化
├── chapter08/          # 第8章: CD/CI
├── .gitignore
└── README.md           # プロジェクト全体の説明
```

## 必要な環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上
- Git

## セットアップ手順

1. リポジトリをクローン

   ```bash
   git clone https://github.com/torikasyu/electron-book-samples.git
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

## コントリビューション

バグの報告や機能の提案、プルリクエストは大歓迎です。以下のガイドラインに従ってください。

1. イシューを作成して、変更内容を説明してください
2. 機能ブランチを作成して変更を加えてください
3. プルリクエストを作成してください

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 著者

- Hiroki Tanaka - [@torikasyu](https://twitter.com/torikasyu)

## 免責事項

このリポジトリのコードは、学習目的で提供されているものです。このコードを使用したことにより生じたいかなる損害（直接損害、間接損害、特別損害、結果的損害、使用不能、データの損失、利益の損失、業務の中断など）について、いかなる責任も負いかねます。

このコードを使用する場合は、自己責任で行ってください。本番環境での利用前に、必ず十分なテストと検証を行ってください。
