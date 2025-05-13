# 第5章: 画像管理アプリの作成

このディレクトリには、Electron入門書の第5章で解説されている画像管理アプリのサンプルコードが含まれています。

## 内容

- クリーンアーキテクチャを採用したアプリケーション設計
- Supabase Storageを使った画像の保存と管理
- 画像のアップロード、ダウンロード、表示機能の実装

## プロジェクト構造

```
chapter06/
├── src/
│   ├── domain/                    # ドメイン層
│   │   └── models/                # ドメインモデル
│   │       └── image.ts           # 画像モデル
│   ├── application/               # アプリケーション層
│   │   ├── usecases/              # ユースケース
│   │   │   ├── uploadImage.ts     # 画像アップロードユースケース
│   │   │   ├── downloadImage.ts   # 画像ダウンロードユースケース
│   │   │   └── listImages.ts      # 画像一覧取得ユースケース
│   │   └── repositories/          # リポジトリインターフェース
│   │       └── imageRepository.ts # 画像リポジトリインターフェース
│   ├── infrastructure/            # インフラストラクチャ層
│   │   ├── supabase/              # Supabase関連
│   │   │   └── supabaseClient.ts  # Supabaseクライアント
│   │   └── repositories/          # リポジトリ実装
│   │       └── supabaseImageRepository.ts # Supabase画像リポジトリ
│   ├── presentation/              # プレゼンテーション層
│   │   ├── components/            # UIコンポーネント
│   │   │   ├── ImageGrid.tsx      # 画像グリッド表示
│   │   │   ├── ImageUploader.tsx  # 画像アップローダー
│   │   │   └── ImageViewer.tsx    # 画像ビューア
│   │   ├── hooks/                 # カスタムフック
│   │   │   └── useImages.ts       # 画像管理フック
│   │   └── App.tsx                # メインのReactコンポーネント
│   ├── main/                      # メインプロセス関連のコード
│   │   └── main.ts                # メインプロセスのエントリーポイント
│   ├── renderer/                  # レンダラープロセス関連のコード
│   │   ├── index.html             # HTMLテンプレート
│   │   └── index.tsx              # レンダラープロセスのエントリーポイント
│   └── preload/                   # プリロードスクリプト
│       └── preload.ts             # プリロードスクリプト
├── package.json                   # プロジェクト設定
├── tsconfig.json                  # TypeScript設定
└── webpack.config.js              # Webpack設定
```

## 実行方法

```bash
# 依存パッケージのインストール
npm install

# 環境変数の設定
# .env.localファイルを作成し、以下の内容を設定してください
# SUPABASE_URL=あなたのSupabaseプロジェクトURL
# SUPABASE_ANON_KEY=あなたのSupabase匿名キー

# 開発モードでアプリケーションを実行
npm run dev
```

## 学習ポイント

1. **クリーンアーキテクチャ**
   - 関心の分離による保守性の高いコード設計
   - 依存関係の方向性の制御
   - テスト容易性の向上

2. **Supabase Storage**
   - クラウドストレージの利用方法
   - 認証と権限管理
   - ファイルのアップロードとダウンロード

3. **非同期処理**
   - 画像の非同期ロード
   - エラーハンドリング
   - ローディング状態の管理

4. **セキュリティ**
   - 環境変数を使った認証情報の管理
   - セキュアな通信