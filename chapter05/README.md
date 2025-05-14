# 画像管理アプリケーション

Electron、React、TypeScriptを使用した画像管理アプリケーションです。Supabaseを使用して画像を保存・管理します。

## 機能

- 画像のアップロード・表示・削除
- Supabase Storageを使用したクラウドストレージ
- 設定管理（ユーザーデータディレクトリに保存）
- 安全なファイル名生成とMIMEタイプ検出

## 技術スタック

- **フロントエンド**: React、TypeScript
- **バックエンド**: Electron（メインプロセス）
- **ストレージ**: Supabase Storage
- **ビルドツール**: Webpack

## 開発環境のセットアップ

### 前提条件

- Node.js (バージョン14以上)
- npm または yarn
- Supabaseアカウント

### インストール

```bash
# 依存関係のインストール
npm install
# または
yarn install
```

### 開発モードでの実行

```bash
# 開発モードで実行
npm run dev
# または
yarn dev
```

### ビルド

```bash
# アプリケーションのビルド
npm run build
# または
yarn build
```

## 設定

### 開発環境

開発環境では、プロジェクトルートに`.env`ファイルを作成し、以下の環境変数を設定してください：

```
SUPABASE_URL=あなたのSupabaseプロジェクトURL
SUPABASE_ANON_KEY=あなたのSupabaseの匿名キー
SUPABASE_BUCKET=画像を保存するバケット名（デフォルト: images）
```

### 本番環境

本番環境では、アプリケーションの初回起動時に設定画面が表示されます。ここでSupabaseの接続情報を入力してください。
設定はユーザーデータディレクトリ（Macの場合は`~/Library/Application Support/electron-image-manager`）に保存されます。

## Supabaseの設定

### プロジェクトの作成

1. [Supabase公式サイト](https://supabase.com/)にアクセスし、アカウントを作成します。
2. 新しいプロジェクトを作成します。

### Storageの設定

1. プロジェクトダッシュボードから「Storage」を選択します。
2. 「バケットを作成」をクリックし、`images`という名前のバケットを作成します。
3. バケットのアクセス権限を設定します。以下のRLS（Row Level Security）ポリシーを設定することをお勧めします：

```sql
-- 全てのユーザーが読み取り可能
 CREATE POLICY "Public Access" ON storage.objects
   FOR SELECT USING (bucket_id = 'images' AND path LIKE 'public/%');

-- 全てのユーザーがアップロード可能
 CREATE POLICY "Public Upload" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'images' AND path LIKE 'public/%');

-- 全てのユーザーが削除可能
 CREATE POLICY "Public Delete" ON storage.objects
   FOR DELETE USING (bucket_id = 'images' AND path LIKE 'public/%');
```

### アプリケーションの設定

1. Supabaseプロジェクトの「設定」「プロジェクトAPI」から以下の情報を取得します：
   - プロジェクトURL
   - 匿名キー（anon key）

2. これらの情報をアプリケーションの設定に入力します。

## プロジェクト構造

### 基本構造

```
chapter05/
├─ config/              # Webpack設定
├─ dist/                # ビルド出力
├─ src/
│   ├─ main/            # Electronメインプロセス
│   │   ├─ api/        # API機能
│   ├─ renderer/        # Reactレンダラープロセス
│   │   ├─ components/  # Reactコンポーネント
│   │   └─ types/       # 型定義
│   └─ shared/          # 共有コード
├─ package.json
└─ tsconfig.json
```

### 詳細なファイル構造

```
chapter05/
├─ config/                      # Webpack設定
│   ├─ webpack.main.js           # メインプロセスのWebpack設定
│   └─ webpack.renderer.js       # レンダラープロセスのWebpack設定
├─ dist/                        # ビルド出力
├─ src/
│   ├─ main/                    # Electronメインプロセス
│   │   ├─ api/                 # API機能
│   │   │   ├─ config.ts         # 設定管理機能
│   │   │   └─ images.ts         # 画像管理機能
│   │   ├─ main.ts              # メインプロセスのエントリーポイント
│   │   └─ preload.ts           # プリロードスクリプト
│   ├─ renderer/                # Reactレンダラープロセス
│   │   ├─ components/          # Reactコンポーネント
│   │   │   ├─ ImageCard.tsx     # 画像カードコンポーネント
│   │   │   └─ SettingsModal.tsx # 設定モーダルコンポーネント
│   │   ├─ types/               # 型定義
│   │   │   └─ electron.d.ts     # ElectronのAPI型定義
│   │   ├─ App.tsx              # アプリケーションのメインコンポーネント
│   │   ├─ index.html           # HTMLテンプレート
│   │   ├─ index.tsx            # Reactのエントリーポイント
│   │   └─ styles.css            # スタイルシート
│   └─ shared/                  # 共有コード
│       └─ types.ts             # 共有型定義
├─ package.json                  # プロジェクト設定と依存関係
├─ tsconfig.json                 # TypeScript設定
└─ webpack.config.js             # Webpackメイン設定
```

## 実装のポイント

### コードの構造化

アプリケーションのコードは機能単位で分割され、保守性と再利用性を高めています。特に、メインプロセス側のコードは以下のように構造化されています：

- **api/config.ts**: 設定管理に関する機能を集約
- **api/images.ts**: 画像管理（アップロード、取得、削除）に関する機能を集約
- **main.ts**: アプリケーションのメインプロセスとIPC通信のハンドラーを定義
- **preload.ts**: レンダラープロセスに公開するAPIを定義

このような関数ベースの設計により、コードの可読性とメンテナンス性が向上しています。

### メインプロセスとレンダラープロセスの通信

メインプロセスとレンダラープロセス間の通信は、ElectronのIPC（プロセス間通信）機能を使用して実装されています。プリロードスクリプトで安全なインターフェースを提供し、コンテキストアイソレーションを確保しています。

### 設定管理

アプリケーションの設定は、ユーザーデータディレクトリに保存されます。これにより、アプリケーションの再インストール後も設定が保持されます。`api/config.ts`モジュールがこの機能を担当しています。

### 画像管理

画像は、Supabase Storageに保存されます。`api/images.ts`モジュールに実装された機能により、アップロード時にはUUIDを使用して安全なファイル名を生成し、適切なMIMEタイプを設定しています。これによりファイル名の重複や特殊文字による問題を回避しています。

### ユーザーインターフェース

Reactを使用したシンプルなユーザーインターフェースを提供しています。画像のアップロード、表示、削除などの基本的な機能を実装しています。