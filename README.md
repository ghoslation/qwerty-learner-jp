<div align="center">
  <img src="src/assets/logo.svg" alt="Qwerty Learner logo" />
</div>

# Qwerty Learner JP

Qwerty Learner JP は、[Qwerty Learner](https://github.com/RealKai42/qwerty-learner) から
<ruby>分<rt>わ</rt></ruby>かれたフォークです。

このフォークでは、アプリの<ruby>画面<rt>がめん</rt></ruby>を
<ruby>日本語<rt>にほんご</rt></ruby>で<ruby>使<rt>つか</rt></ruby>いやすくすることを
<ruby>大切<rt>たいせつ</rt></ruby>にしています。
<ruby>若<rt>わか</rt></ruby>い<ruby>子<rt>こ</rt></ruby>どもでも
<ruby>読<rt>よ</rt></ruby>みやすいように、むずかしい<ruby>言葉<rt>ことば</rt></ruby>をへらし、
ふりがなや、やさしい<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>使<rt>つか</rt></ruby>います。

## このフォークでしていること

- UI の<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>自然<rt>しぜん</rt></ruby>にする
- むずかしい<ruby>表現<rt>ひょうげん</rt></ruby>を、やさしい<ruby>言葉<rt>ことば</rt></ruby>にする
- <ruby>漢字<rt>かんじ</rt></ruby>にふりがなをつけやすくする
- `<ruby>` タグをそのまま<ruby>文字<rt>もじ</rt></ruby>として出さず、ふりがなとして<ruby>表示<rt>ひょうじ</rt></ruby>する
- <ruby>日本語<rt>にほんご</rt></ruby>の<ruby>学習<rt>がくしゅう</rt></ruby>に合うように、<ruby>画面<rt>がめん</rt></ruby>の文を<ruby>調整<rt>ちょうせい</rt></ruby>する

## もとのプロジェクト

もとのプロジェクトはこちらです。

- Upstream: <https://github.com/RealKai42/qwerty-learner>

Qwerty Learner は、キーボードで<ruby>単語<rt>たんご</rt></ruby>を<ruby>入力<rt>にゅうりょく</rt></ruby>しながら、
<ruby>単語<rt>たんご</rt></ruby>とタイピングを<ruby>練習<rt>れんしゅう</rt></ruby>できるアプリです。

このフォークは、もとのプロジェクトをもとにした<ruby>変更版<rt>へんこうばん</rt></ruby>です。
もとのプロジェクトの<ruby>作者<rt>さくしゃ</rt></ruby>と<ruby>貢献者<rt>こうけんしゃ</rt></ruby>に
<ruby>感謝<rt>かんしゃ</rt></ruby>します。

## ライセンス

このフォークは、もとのプロジェクトと<ruby>同<rt>おな</rt></ruby>じ
GPL-3.0 ライセンスです。

- License: [GNU General Public License v3.0](./LICENSE)

ライセンス<ruby>本文<rt>ほんぶん</rt></ruby>は<ruby>変更<rt>へんこう</rt></ruby>していません。

## <ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>

### <ruby>必要<rt>ひつよう</rt></ruby>なもの

- Node.js
- Yarn
- Git

### <ruby>起動<rt>きどう</rt></ruby>する

```sh
yarn install
yarn start
```

ブラウザで `http://localhost:5173/` を<ruby>開<rt>ひら</rt></ruby>きます。

### ビルドする

```sh
yarn build
```

## <ruby>主<rt>おも</rt></ruby>な<ruby>機能<rt>きのう</rt></ruby>

- <ruby>単語<rt>たんご</rt></ruby>を<ruby>見<rt>み</rt></ruby>てタイピングする
- <ruby>意味<rt>いみ</rt></ruby>やふりがなを<ruby>見<rt>み</rt></ruby>ながら<ruby>学<rt>まな</rt></ruby>ぶ
- <ruby>発音<rt>はつおん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>く
- <ruby>間違<rt>まちが</rt></ruby>えた<ruby>単語<rt>たんご</rt></ruby>をあとで<ruby>復習<rt>ふくしゅう</rt></ruby>する
- タイピングの<ruby>速<rt>はや</rt></ruby>さや<ruby>正解率<rt>せいかいりつ</rt></ruby>を<ruby>見<rt>み</rt></ruby>る

## <ruby>文<rt>ぶん</rt></ruby>の<ruby>方針<rt>ほうしん</rt></ruby>

このフォークでは、<ruby>画面<rt>がめん</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>を
できるだけやさしくします。

- 一文を<ruby>短<rt>みじか</rt></ruby>くする
- むずかしい<ruby>漢字<rt>かんじ</rt></ruby>には、できるだけふりがなをつける
- <ruby>子<rt>こ</rt></ruby>どもが<ruby>読<rt>よ</rt></ruby>んでもわかる<ruby>言葉<rt>ことば</rt></ruby>を<ruby>選<rt>えら</rt></ruby>ぶ
- <ruby>機械翻訳<rt>きかいほんやく</rt></ruby>のような<ruby>不自然<rt>ふしぜん</rt></ruby>な文を<ruby>直<rt>なお</rt></ruby>す
- <ruby>意味<rt>いみ</rt></ruby>が<ruby>変<rt>か</rt></ruby>わらないように<ruby>気<rt>き</rt></ruby>をつける

## <ruby>貢献<rt>こうけん</rt></ruby>する

<ruby>直<rt>なお</rt></ruby>したいところや、もっとよくしたいところがあれば、
Issue や Pull Request を<ruby>送<rt>おく</rt></ruby>ってください。

くわしくは [CONTRIBUTING](./docs/CONTRIBUTING.md) を<ruby>見<rt>み</rt></ruby>てください。

このフォークだけの<ruby>変更<rt>へんこう</rt></ruby>は、このリポジトリへ<ruby>送<rt>おく</rt></ruby>ってください。
もとの Qwerty Learner にも<ruby>役立<rt>やくだ</rt></ruby>つ<ruby>変更<rt>へんこう</rt></ruby>は、
upstream への<ruby>提案<rt>ていあん</rt></ruby>も<ruby>検討<rt>けんとう</rt></ruby>してください。
