# 第7章: Electronアプリのビルド

このディレクトリには、Electron入門書の第7章で解説されているElectronアプリケーションのビルドとパッケージングに関するサンプルコードが含まれています。

## 内容

- 各プラットフォーム向けのビルド設定
- パッケージング
- 自動アップデート機能の実装

## プロジェクト構造

```
chapter08/
├── src/                      # アプリケーションソースコード
│   ├── main/                 # メインプロセス関連のコード
│   │   ├── main.ts           # メインプロセスのエントリーポイント
│   │   └── updater.ts        # 自動アップデート機能
│   ├── renderer/             # レンダラープロセス関連のコード
│   │   ├── components/       # UIコンポーネント
│   │   ├── App.tsx           # メインのReactコンポーネント
│   │   ├── index.html        # HTMLテンプレート
│   │   └── index.tsx         # レンダラープロセスのエントリーポイント
│   └── preload/              # プリロードスクリプト
│       └── preload.ts        # プリロードスクリプト
├── build/                    # ビルド関連ファイル
│   ├── icons/                # アプリケーションアイコン
│   │   ├── icon.icns         # macOS用アイコン
│   │   ├── icon.ico          # Windows用アイコン
│   │   └── icon.png          # Linux用アイコン
│   └── entitlements.plist    # macOS用エンタイトルメント
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

# アプリケーションのビルド（全プラットフォーム）
npm run build

# 特定プラットフォーム向けのビルド
npm run build:mac
npm run build:win
npm run build:linux
```

## 学習ポイント

1. **electron-builder**
   - ビルド設定の詳細
   - プラットフォーム固有の設定

2. **アプリケーションの署名**
   - コード署名の重要性
   - macOSとWindowsでの署名方法

3. **自動アップデート**
   - electron-updaterの使用方法
   - アップデートサーバーの設定
   - ユーザーへのアップデート通知