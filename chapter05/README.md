# 画像管理アプリケーション

Electron、React、TypeScriptを使用した画像管理アプリケーションです。Supabase Storageを使用して画像をクラウド上で保存・管理します。

## 機能

- 画像のアップロード・表示・削除
- Supabase Storageを使用したクラウドストレージ連携
- ローカル設定の永続化（ユーザーデータディレクトリに保存）
- 安全なファイル名生成とMIMEタイプ検出
- レスポンシブなUIデザイン

## 環境要件

- Node.js: 18.0.0 以上
- npm: 9.0.0 以上
- Supabaseアカウント

## セットアップ手順

### 1. プロジェクトの移動

```bash
cd chapter05
```

### 2. 依存関係のインストール

```bash
npm install
```

## 開発手順

### 開発モードで起動

```bash
npm run dev
```
### ビルド
```bash
npm run build
```

### 実行

ビルド済みのアプリケーションを実行します:

```bash
npm start
```

## プロジェクト構成

```
chapter05/
├── config/                   # Webpack設定ファイル
│   ├── webpack.main.js      # メインプロセス用Webpack設定
│   └── webpack.renderer.js  # レンダラープロセス用Webpack設定
├── dist/                    # ビルド出力先
├── src/
│   ├── main/               # メインプロセス関連ファイル
│   │   ├── api/             # API関連の実装
│   │   │   ├── config.ts    # 設定管理
│   │   │   └── images.ts    # 画像処理関連のAPI
│   │   ├── main.ts         # メインプロセスのエントリーポイント
│   │   └── preload.ts      # プリロードスクリプト
│   ├── renderer/           # レンダラープロセス関連ファイル
│   │   ├── components/     # Reactコンポーネント
│   │   │   ├── ImageCard.tsx      # 画像表示用カードコンポーネント
│   │   │   └── SettingsModal.tsx  # 設定モーダルコンポーネント
│   │   ├── App.tsx         # メインのReactコンポーネント
│   │   ├── index.html      # メインのHTMLテンプレート
│   │   ├── index.tsx       # レンダラーのエントリーポイント
│   │   └── styles.css      # スタイルシート
│   └── shared/             # 共有コード
│       └── types.ts        # 型定義
├── package.json            # プロジェクト設定
├── tsconfig.json           # TypeScript設定
└── webpack.config.js       # メインのWebpack設定
```
### Supabaseの設定

設定画面でSupabaseの接続情報を入力してください。
設定ファイルはユーザーデータディレクトリ（Macの場合は`~/Library/Application Support/electron-image-manager`）に保存されます。

## Supabaseのセットアップ

### プロジェクトの作成

1. [Supabase公式サイト](https://supabase.com/)にアクセスし、アカウントを作成します。
2. 新しいプロジェクトを作成します。

### Storageの設定

1. プロジェクトダッシュボードから「Storage」を選択します。
2. 「バケットを作成」をクリックし、`images`という名前のバケットを作成します。
3. バケットのアクセス権限を設定します。以下のRLS（Row Level Security）ポリシーを設定してください。

なお、このRLSポリシーはあくまでサンプルアプリケーション用のもので、セキュリティ対策としては十分ではありません。
実際に運用する場合は、より厳格なアクセス制御を実装してください。

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

アプリケーションのコードは機能単位で分割され、保守性と再利用性を高めています。特に、メインプロセス側のコードは以下のように分割されています。

- **api/config.ts**: 設定管理に関する機能を集約
- **api/images.ts**: 画像管理（アップロード、取得、削除）に関する機能を集約
- **main.ts**: アプリケーションのメインプロセスとIPC通信のハンドラーを定義
- **preload.ts**: レンダラープロセスに公開するAPIを定義

### メインプロセスとレンダラープロセスの通信

メインプロセスとレンダラープロセス間の通信は、ElectronのIPC（プロセス間通信）機能を使用して実装されています。プリロードスクリプトで安全なインターフェースを提供し、コンテキストアイソレーションを確保しています。

### 設定管理

アプリケーションの設定は、ユーザーデータディレクトリに保存されます。これにより、アプリケーションの再インストール後も設定が保持されます。`api/config.ts`モジュールがこの機能を担当しています。

### 画像管理

画像は、Supabase Storageに保存されます。`api/images.ts`モジュールに実装された機能により、アップロード時にはUUIDを使用して安全なファイル名を生成し、適切なMIMEタイプを設定しています。これによりファイル名の重複や特殊文字による問題を回避しています。

### ユーザーインターフェース

Reactを使用したシンプルなユーザーインターフェースを提供しています。画像のアップロード、表示、削除などの基本的な機能を実装しています。