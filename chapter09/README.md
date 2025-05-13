# 第8章: CD/CI

このディレクトリには、Electron入門書の第8章で解説されているElectronアプリケーションの継続的デリバリー/継続的インテグレーション（CD/CI）に関するサンプルコードが含まれています。

## 内容

- GitHub Actionsとは
- GitHub Actionsを使ったElectronアプリのCD/CI

## プロジェクト構造

```
chapter09/
├── src/                      # アプリケーションソースコード
│   ├── main/                 # メインプロセス関連のコード
│   │   └── main.ts           # メインプロセスのエントリーポイント
│   ├── renderer/             # レンダラープロセス関連のコード
│   │   ├── components/       # UIコンポーネント
│   │   ├── App.tsx           # メインのReactコンポーネント
│   │   ├── index.html        # HTMLテンプレート
│   │   └── index.tsx         # レンダラープロセスのエントリーポイント
│   └── preload/              # プリロードスクリプト
│       └── preload.ts        # プリロードスクリプト
├── .github/                  # GitHub関連ファイル
│   └── workflows/            # GitHub Actionsのワークフロー
│       ├── build.yml         # ビルドワークフロー
│       ├── release.yml       # リリースワークフロー
│       └── test.yml          # テストワークフロー
├── electron-builder.yml      # electron-builder設定
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
└── webpack.config.js         # Webpack設定
```

## 実行方法

```bash
# 依存パッケージのインストール
npm install

# 開発モードでアプリケーションを実行
npm run dev

# ローカルでのビルドテスト
npm run build
```

## 学習ポイント

1. **GitHub Actionsの基本**
   - ワークフローの概念
   - YAMLファイルの書き方
   - アクションの種類

2. **Electronアプリのビルド自動化**
   - マルチプラットフォームビルド
   - 環境変数と秘密情報の管理
   - アーティファクトの保存

3. **自動リリース**
   - リリースの自動化
   - バージョン管理
   - リリースノートの生成

4. **CI/CDパイプラインの最適化**
   - キャッシュの活用
   - マトリックスビルド
   - 並列処理