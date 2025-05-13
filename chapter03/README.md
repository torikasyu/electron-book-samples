# 第2章: 開発環境構築

このディレクトリには、Electron入門書の第2章で解説されている開発環境構築に関するサンプルコードとファイルが含まれています。

## 内容

- Node.jsのインストール
- Visual Studio Codeのセットアップ
- プロジェクトの初期化
- 必要なパッケージのインストール
- 設定ファイルの作成と説明
- プロジェクト構造の解説

## プロジェクト構造

```
chapter03/
├── src/                      # アプリケーションソースコード
│   ├── main/                 # メインプロセス関連のコード
│   │   └── main.ts           # メインプロセスのエントリーポイント
│   ├── renderer/             # レンダラープロセス関連のコード
│   │   ├── App.tsx           # メインのReactコンポーネント
│   │   ├── index.html        # HTMLテンプレート
│   │   └── index.tsx         # レンダラープロセスのエントリーポイント
│   └── preload/              # プリロードスクリプト
│       └── preload.ts        # プリロードスクリプト
├── config/                   # 設定ファイル
│   ├── webpack.main.js       # メインプロセス用Webpack設定
│   └── webpack.renderer.js   # レンダラープロセス用Webpack設定
├── .eslintrc.js              # ESLint設定
├── .prettierrc               # Prettier設定
├── tsconfig.json             # TypeScript設定
├── package.json              # プロジェクト設定
└── webpack.config.js         # Webpack設定
```

## 実行方法

```bash
# 依存パッケージのインストール
npm install

# 開発モードでアプリケーションを実行
npm run dev
```

## 学習ポイント

1. **プロジェクト初期化**
   - `package.json`の設定
   - 開発依存パッケージと実行時依存パッケージの違い

2. **TypeScript設定**
   - `tsconfig.json`の重要なオプション
   - Electronとの互換性設定

3. **Webpack設定**
   - メインプロセスとレンダラープロセスの個別設定
   - 開発環境と本番環境の分離

4. **開発ツール**
   - ESLintとPrettierの設定
   - デバッグ環境のセットアップ

5. **プロジェクト構造**
   - 関数ベースの設計に適した構造
   - クリーンアーキテクチャの基盤作り