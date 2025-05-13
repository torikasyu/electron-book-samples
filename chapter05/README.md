# 第4章: ToDoアプリの作成

このディレクトリには、Electron入門書の第4章で解説されているToDoアプリのサンプルコードが含まれています。

## 内容

- 関数ベースの設計によるアプリケーション実装
- React Hooksを使った状態管理
- ローカルストレージを利用したデータ永続化

## プロジェクト構造

```
chapter05/
├── src/
│   ├── main/                # メインプロセス関連のコード
│   │   └── main.ts          # メインプロセスのエントリーポイント
│   ├── renderer/            # レンダラープロセス関連のコード
│   │   ├── components/      # UIコンポーネント
│   │   │   ├── TodoForm.tsx # Todo追加フォーム
│   │   │   ├── TodoItem.tsx # 個別のTodoアイテム
│   │   │   └── TodoList.tsx # Todoリスト
│   │   ├── hooks/           # カスタムフック
│   │   │   └── useTodos.ts  # Todo管理用フック
│   │   ├── App.tsx          # メインのReactコンポーネント
│   │   ├── index.html       # HTMLテンプレート
│   │   └── index.tsx        # レンダラープロセスのエントリーポイント
│   └── preload/             # プリロードスクリプト
│       └── preload.ts       # プリロードスクリプト
├── package.json             # プロジェクト設定
├── tsconfig.json            # TypeScript設定
└── webpack.config.js        # Webpack設定
```

## 実行方法

```bash
# 依存パッケージのインストール
npm install

# 開発モードでアプリケーションを実行
npm run dev
```

## 学習ポイント

1. **関数ベースの設計**
   - クラスを使わない関数型プログラミングアプローチ
   - 純粋関数によるロジックの分離

2. **React Hooks**
   - `useState`を使った状態管理
   - `useEffect`を使ったサイドエフェクト処理
   - カスタムフックによるロジックの再利用

3. **ローカルストレージ**
   - Electronでのデータ永続化
   - アプリケーション再起動時のデータ復元