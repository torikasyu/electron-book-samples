# Electronアプリの配布パッケージ作成サンプル

Electron、React、TypeScript、electron-builderを組み合わせた配布パッケージ作成のサンプルです。

## セットアップ

```bash
cd chapter07
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

## アプリケーションのビルド

electron-builderを使用して、配布可能なパッケージを作成できます。

### アイコンの設定

アプリケーションのアイコンは `assets/icon` に配置します。各プラットフォーム用に以下のファイルが必要です：

- macOS: `assets/icon.icns`
- Windows: `assets/icon.ico`
- Linux: `assets/icon.png`（複数サイズが必要）

### インストーラーは作成せず、実行可能なアプリケーションディレクトリのみ生成

```bash
npm run pack
```

### 全てのプラットフォーム向けにビルド
```bash
npm run dist
```

### 各プラットフォーム別にビルド
```bash
# macOS向け（DMG、ZIP）
npm run dist:mac

# Windows向け（NSIS、Portable）
npm run dist:win

# Linux向け（AppImage、deb）
npm run dist:linux
```

## プロジェクト構成

```
chapter07/
├── assets/                    # 静的アセット
│   └── icons/                 # アプリケーションアイコン
│       ├── mac/               # macOS用アイコン
│       │   └── icon.icns
│       ├── png/               # 各種サイズのPNGアイコン
│       │   ├── 16x16.png
│       │   ├── 32x32.png
│       │   └── ...
│       └── win/               # Windows用アイコン
│           └── icon.ico
├── src/
│   ├── main/                  # メインプロセス
│   │   └── main.ts            # メインプロセスのエントリーポイント
│   ├── renderer/              # レンダラープロセス
│   │   ├── App.tsx            # メインのReactコンポーネント
│   │   ├── index.html         # メインのHTMLテンプレート
│   │   └── index.tsx          # レンダラーのエントリーポイント
│   └── types/                 # 型定義
│       └── global.d.ts        # グローバル型定義
├── dist/                      # ビルド出力先
├── package.json               # プロジェクト設定
├── tsconfig.json              # TypeScript設定
├── webpack.config.js          # Webpack設定
└── package-lock.json          # 依存関係のロックファイル
```

### アイコンの変更
1. 新しいアイコンを `assets/icons/png/` に配置
2. 必要な形式に変換（macOS: .icns, Windows: .ico）
3. `package.json` の `build.files` に新しいアイコンファイルを追加

### ビルド設定のカスタマイズ
`package.json` の `build` セクションを編集します。

```json
"build": {
  "appId": "com.example.app",
  "productName": "Your App",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "package.json"
  ],
  "mac": {
    "category": "public.app-category.developer-tools"
  },
  "win": {
    "target": ["nsis", "portable"]
  },
  "linux": {
    "target": ["AppImage", "deb"],
    "category": "Development"
  }
}
```
