# Electron + React + TypeScript + webpack サンプルアプリ (Chapter 08)

React、Electron、TypeScript、webpackを組み合わせたファイルサイズ表示アプリケーションです。

## セットアップ

```bash
# プロジェクトルートに移動
cd chapter08

# 依存関係をインストール
npm install
```

## 開発

### ビルド
```bash
npm run build
```

### 開発モード（ビルド後にElectronを起動）
```bash
npm run dev
```

### ファイル監視モード（開発時推奨）
```bash
# ターミナル1: webpackでファイル監視
npm run watch

# ターミナル2: Electronアプリ起動
npm start
```

### テスト実行

#### ユニットテスト（Jest）
```bash
npm test
```

#### E2Eテスト（Playwright）
```bash
# ビルド後にE2Eテストを実行
npm run build
npm run e2e
```

## リポジトリ構成

```
electron-book-samples/         # リポジトリルート
├── .github/                    # GitHub 設定
│   └── workflows/              # GitHub Actions ワークフロー
│       └── ci.yml              # CI/CD パイプライン設定
├── chapter08/                  # 第8章のプロジェクト
│   ├── package.json            # パッケージ設定
│   ├── package-lock.json       # 依存関係のロックファイル
│   ├── electron-builder.yml    # アプリケーションビルド設定
│   ├── tsconfig.json           # TypeScript設定
│   ├── tsconfig.test.json      # テスト用TypeScript設定
│   ├── jest.config.js          # Jestの設定
│   ├── webpack.config.js       # webpack設定（メイン・レンダラー）
│   ├── src/
│   │   ├── main/
│   │   │   └── main.ts       # Electronメインプロセス
│   │   ├── renderer/
│   │   │   ├── App.tsx       # メインコンポーネント
│   │   │   ├── index.html    # HTMLテンプレート
│   │   │   ├── index.tsx     # Reactエントリポイント
│   │   │   ├── components/
│   │   │   │   ├── fileSizeViewer.tsx       # ファイルサイズ表示コンポーネント
│   │   │   │   └── fileSizeViewer.test.tsx  # コンポーネントのテスト
│   │   │   └── utils/
│   │   │       ├── getFormattedFileSize.ts      # ファイルサイズ変換ユーティリティ
│   │   │       └── getFormattedFileSize.test.ts # ユーティリティのテスト
│   │   ├── e2e/
│   │   │   ├── app.e2e-test.ts     # E2Eテスト
│   │   │   └── playwright.config.ts # Playwright設定
│   │   ├── setupTests.ts     # テスト設定
│   │   └── types/
│   │       └── global.d.ts   # グローバル型定義
│   └── dist/                 # ビルド出力先
│       ├── main.js
│       └── renderer/
└── (他の章のディレクトリ)
```

## 主な特徴

- **TypeScript**: 型安全なコード記述
- **React**: モダンなReact 18を使用
- **テスト**: Jest（ユニットテスト）とPlaywright（E2Eテスト）を導入
- **webpack**: メインプロセスとレンダラープロセスを個別にバンドル
- **セキュア**: `nodeIntegration: false`, `contextIsolation: true`で設定

## CI/CD パイプライン

このプロジェクトはGitHub Actionsを使用してCI/CDパイプラインを構成しています。ワークフローファイルはリポジトリルートの `.github/workflows/ci.yml` に配置されています。

> **Note**
> このプロジェクトはマルチチャプター構成のため、ワークフローファイルはリポジトリルートに配置されています。`chapter08` ディレクトリ内の変更のみを検知して実行されるよう、パスフィルタが設定されています。

### トリガー条件
- `chapter08/**` パスに変更があるプッシュ/PR
- 手動実行（GitHub ActionsのUIから可能）

### 実行されるジョブ
1. **テスト**
   - ユニットテスト（Jest）
   - E2Eテスト（Playwright、macOSのみ）
   - マトリックス戦略で複数OS（Ubuntu/macOS/Windows）で実行

2. **ビルド**
   - プラットフォーム別のアプリケーションビルド
     - macOS: DMG
     - Windows: NSIS
     - Linux: AppImage
   - 成果物のアップロード
   - リリース作成（main/masterブランチへのプッシュ時）

### ワークフローファイルの構成

#### 場所
- `.github/workflows/ci.yml`

#### 主な機能
- **テストジョブ**: 複数OSでのテスト実行
- **ビルドジョブ**: プラットフォーム別のアプリケーションビルド
- **成果物管理**: ビルド成果物のアップロードとリリース

#### 環境変数
| 変数名 | 説明 | 必須 |
|--------|------|------|
| `GITHUB_TOKEN` | GitHub API 認証用トークン | ✅ (自動挿入) |

#### キャッシュ戦略
- npm 依存関係のキャッシュを有効化し、ビルド時間を短縮
- キャッシュキー: `npm-${runner.os}-${hashFiles('**/package-lock.json')}`

#### マトリックス戦略
| ジョブ | OS | 目的 |
|--------|------|------|
| test | ubuntu-latest, macos-latest, windows-latest | クロスプラットフォームテスト |
| build | macos-latest | macOS 向けビルド (DMG) |
| build | windows-latest | Windows 向けビルド (NSIS) |
| build | ubuntu-latest | Linux 向けビルド (AppImage) |

#### 手動実行方法
1. GitHub リポジトリの「Actions」タブを開く
2. 左メニューから「CI - Chapter 08」を選択
3. 「Run workflow」ボタンをクリック
4. 必要に応じてブランチと実行理由を入力
5. 「Run workflow」で実行

## カスタマイズポイント

### アプリケーション
- `src/main/main.ts`: Electronメインプロセスの処理
- `src/renderer/App.tsx`: Reactアプリケーションのメインコンポーネント
- `src/renderer/components/`: UIコンポーネント
- `src/renderer/utils/`: ユーティリティ関数
- `src/e2e/`: E2Eテスト

### 設定ファイル
- `webpack.config.js`: バンドル設定（CSS、画像等の追加も可能）
- `jest.config.js`: Jestテスト設定
- `tsconfig.json`: TypeScriptコンパイル設定
- `electron-builder.yml`: アプリケーションビルド設定

## 開発ガイドライン

### 依存関係の更新
```bash
# 依存関係を更新
npm update

# パッケージを追加
npm install <package-name> --save-dev  # 開発依存関係
npm install <package-name>            # 本番依存関係
```

### テストの追加
- ユニットテスト: `src/**/*.test.ts` または `src/**/*.test.tsx`
- コンポーネントテスト: `src/**/*.test.tsx`
- E2Eテスト: `src/e2e/` ディレクトリに追加
