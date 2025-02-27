# pro_shop_wave
【PRO SHOP WAVE】 自動車カスタムパーツ店のECサイトを作成

【Sass フォルダ構成】
sass/
├── global/
│   ├── _index.scss       // 各グローバルファイルの読み込み
│   ├── _variables.scss   // 変数定義（カラー、フォントなど）
│   ├── _mq.scss          // メディアクエリ用mixin
│   └── _mixin.scss       // 汎用mixin（アニメーション、レイアウト補助）
├── parts/
│   └── _common.scss      // 共通パーツ（body, header, footerなど）
├── pages/
│   └── home.scss      // トップページ専用スタイル
└── style.scss            // メインのSassファイル（global, parts, pagesを読み込む）