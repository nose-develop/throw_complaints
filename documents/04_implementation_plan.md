# グチ投げ 実装計画

## 実装前確認

開発を始める前に以下を確認する。

- `documents/00_overview.md`
- `documents/01_screen_design.md`
- `documents/02_function_design.md`
- `documents/03_design_and_animation.md`
- `node_modules/next/dist/docs/` の関連ガイド

特にNext.js 16のApp Router、`'use client'`、Tailwind CSS 4の記法を確認する。

## 推奨ファイル構成

最小構成で進める場合:

- `app/page.tsx`: 1ページ完結の画面本体
- `app/globals.css`: Tailwind読み込み、全体背景、必要なCSS Animation
- `app/layout.tsx`: メタデータ、言語設定、共通レイアウト

整理する場合:

- `app/_components/ComplaintThrowApp.tsx`: クライアント状態を持つメインUI
- `app/_lib/destinations.ts`: 文字数判定テーブルと判定関数
- `app/page.tsx`: メインコンポーネントの呼び出し

インタラクションが多いため、状態を持つコンポーネントには `'use client'` を付ける。

## 実装手順

1. 既存の初期ページを「グチ投げ」アプリに置き換える
2. 判定テーブルと到達地点判定関数を作る
3. 入力画面を作る
4. 空欄バリデーションと文字数カウントを実装する
5. 投げる演出状態を実装する
6. 結果画面を実装する
7. もう一度投げる動作を実装する
8. レスポンシブ表示を調整する
9. `npm run lint` と `npm run build` で確認する

## 実装判断

- 初期版ではサーバー処理やAPI Routeを作らない
- グチ本文は保存しない
- 外部画像は必須にしない
- 追加依存はなるべく避け、CSS AnimationとTailwindで表現する
- SNSシェアは時間があれば追加する

## 受け入れ基準

- 空欄で投げるとエラーが出る
- 1-500文字の入力で対応する到達地点が表示される
- 500文字を超えて入力できない
- 投げるボタン押下後、演出を経て結果画面に切り替わる
- 結果画面に到達地点、文字数、メッセージ、もう一度投げるボタンがある
- もう一度投げるで入力画面に戻り、前回入力が消える
- スマホ幅でも主要操作が破綻しない
- グチ本文が保存、共有、再表示されない

## テスト観点

- 0文字
- 空白のみ
- 1文字
- 20文字
- 21文字
- 50文字
- 51文字
- 100文字
- 101文字
- 250文字
- 251文字
- 500文字
- もう一度投げる
- スマホ幅での表示
- `prefers-reduced-motion` の簡略表示
