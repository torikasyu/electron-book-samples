# 画像管理アプリケーション

Electron、React、TypeScriptを使用した画像管理アプリケーションです。Supabaseを使用して画像を保存・管理します。

## 機能

- 画像のアップロード・表示・削除
- 画像へのタグ付け
- 画像情報の編集
- 設定管理（開発環境と本番環境で異なる設定ファイル管理）

## 開発環境のセットアップ

### 前提条件

- Node.js (バージョン14以上)
- npm または yarn

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
```

### 本番環境

本番環境では、アプリケーションの初回起動時に設定画面が表示されます。ここでSupabaseの接続情報を入力してください。
設定はユーザーデータディレクトリ（Macの場合は`~/Library/Application Support/electron-image-manager`）に保存されます。

## Supabaseの設定

1. Supabaseでプロジェクトを作成します。
2. Storageで`images`という名前のバケットを作成します。
3. バケットのアクセス権限を適切に設定します。
4. 必要に応じて、画像メタデータを保存するためのテーブルを作成します：

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## プロジェクト構造

```
chapter05/
├── config/              # Webpack設定
├── dist/                # ビルド出力
├── src/
│   ├── config/          # アプリケーション設定管理
│   ├── main/            # Electronメインプロセス
│   ├── renderer/        # Reactレンダラープロセス
│   │   ├── components/  # Reactコンポーネント
│   │   └── types/       # 型定義
│   └── shared/          # 共有コード
├── package.json
└── tsconfig.json
```