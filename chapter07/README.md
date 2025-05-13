# 第6章: Electronアプリのテスト

このディレクトリには、Electron入門書の第6章で解説されているElectronアプリケーションのテスト手法に関するサンプルコードが含まれています。

## 内容

- テスト環境のセットアップ
- ユニットテスト
- E2Eテスト

## プロジェクト構造

```
chapter07/
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
├── tests/                    # テストコード
│   ├── unit/                 # ユニットテスト
│   │   ├── main/             # メインプロセスのユニットテスト
│   │   └── renderer/         # レンダラープロセスのユニットテスト
│   └── e2e/                  # E2Eテスト
│       └── app.spec.ts       # アプリケーションのE2Eテスト
├── jest.config.js            # Jestの設定ファイル
├── playwright.config.ts      # Playwrightの設定ファイル
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
└── webpack.config.js         # Webpack設定
```

## 実行方法

```bash
# 依存パッケージのインストール
npm install

# ユニットテストの実行
npm run test:unit

# E2Eテストの実行
npm run test:e2e
```

## 学習ポイント

1. **テスト環境のセットアップ**
   - Jest、React Testing Library、Playwrightの導入
   - テスト用の設定ファイルの作成

2. **ユニットテスト**
   - コンポーネントのテスト
   - フックのテスト
   - メインプロセスのテスト

3. **E2Eテスト**
   - Playwrightを使ったElectronアプリのE2Eテスト
   - ユーザー操作のシミュレーション
   - アプリケーション全体の動作確認