# <ruby>貢献<rt>こうけん</rt></ruby>ガイド

Qwerty Learner JP に<ruby>興味<rt>きょうみ</rt></ruby>をもってくれてありがとうございます。

このプロジェクトは、[Qwerty Learner](https://github.com/RealKai42/qwerty-learner) のフォークです。
このフォークでは、<ruby>日本語<rt>にほんご</rt></ruby>で<ruby>使<rt>つか</rt></ruby>いやすく、
<ruby>若<rt>わか</rt></ruby>い<ruby>子<rt>こ</rt></ruby>どもにも<ruby>読<rt>よ</rt></ruby>みやすいアプリを<ruby>目指<rt>めざ</rt></ruby>します。

## どんな<ruby>貢献<rt>こうけん</rt></ruby>を<ruby>歓迎<rt>かんげい</rt></ruby>しますか

- <ruby>不自然<rt>ふしぜん</rt></ruby>な<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>直<rt>なお</rt></ruby>す
- むずかしい<ruby>言葉<rt>ことば</rt></ruby>を、やさしい<ruby>言葉<rt>ことば</rt></ruby>にする
- <ruby>必要<rt>ひつよう</rt></ruby>な<ruby>漢字<rt>かんじ</rt></ruby>にふりがなをつける
- `<ruby>` がそのまま<ruby>表示<rt>ひょうじ</rt></ruby>される<ruby>問題<rt>もんだい</rt></ruby>を<ruby>直<rt>なお</rt></ruby>す
- <ruby>日本語学習<rt>にほんごがくしゅう</rt></ruby>に<ruby>役立<rt>やくだ</rt></ruby>つ UI を<ruby>考<rt>かんが</rt></ruby>える
- バグを<ruby>直<rt>なお</rt></ruby>す
- テストや<ruby>説明<rt>せつめい</rt></ruby>を<ruby>追加<rt>ついか</rt></ruby>する

## <ruby>文<rt>ぶん</rt></ruby>を<ruby>直<rt>なお</rt></ruby>すときのルール

<ruby>画面<rt>がめん</rt></ruby>に出る<ruby>言葉<rt>ことば</rt></ruby>は、できるだけ<ruby>読<rt>よ</rt></ruby>みやすくしてください。

- 一文を<ruby>短<rt>みじか</rt></ruby>くする
- むずかしい<ruby>言葉<rt>ことば</rt></ruby>を<ruby>避<rt>さ</rt></ruby>ける
- <ruby>子<rt>こ</rt></ruby>どもにも<ruby>伝<rt>つた</rt></ruby>わる<ruby>言葉<rt>ことば</rt></ruby>を<ruby>選<rt>えら</rt></ruby>ぶ
- <ruby>漢字<rt>かんじ</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いときは、ふりがなを<ruby>使<rt>つか</rt></ruby>う
- <ruby>意味<rt>いみ</rt></ruby>が<ruby>変<rt>か</rt></ruby>わらないようにする
- <ruby>機械翻訳<rt>きかいほんやく</rt></ruby>のような文にしない

ふりがなをつけるときは、HTML の `<ruby>` を<ruby>使<rt>つか</rt></ruby>えます。

```html
<ruby>椅子<rt>いす</rt></ruby>
```

## Pull Request の<ruby>出<rt>だ</rt></ruby>し<ruby>方<rt>かた</rt></ruby>

1. まず Issue を<ruby>作<rt>つく</rt></ruby>るか、すでにある Issue にコメントしてください。
2. どこを<ruby>直<rt>なお</rt></ruby>すか、かんたんに<ruby>説明<rt>せつめい</rt></ruby>してください。
3. ブランチを<ruby>作<rt>つく</rt></ruby>って<ruby>作業<rt>さぎょう</rt></ruby>してください。
4. できたら Pull Request を<ruby>送<rt>おく</rt></ruby>ってください。
5. できれば、<ruby>動作確認<rt>どうさかくにん</rt></ruby>した<ruby>内容<rt>ないよう</rt></ruby>も<ruby>書<rt>か</rt></ruby>いてください。

## <ruby>開発<rt>かいはつ</rt></ruby>の<ruby>準備<rt>じゅんび</rt></ruby>

```sh
yarn install
yarn start
```

ビルドを<ruby>確認<rt>かくにん</rt></ruby>するときは、こちらを<ruby>使<rt>つか</rt></ruby>います。

```sh
yarn build
```

## upstream との<ruby>関係<rt>かんけい</rt></ruby>

このフォークだけに<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>変更<rt>へんこう</rt></ruby>は、このリポジトリへ Pull Request を<ruby>送<rt>おく</rt></ruby>ってください。

もとの Qwerty Learner にも<ruby>役立<rt>やくだ</rt></ruby>つ<ruby>変更<rt>へんこう</rt></ruby>は、
upstream への Pull Request も<ruby>検討<rt>けんとう</rt></ruby>してください。

## ライセンス

このフォークは、もとのプロジェクトと<ruby>同<rt>おな</rt></ruby>じ GPL-3.0 ライセンスです。

ライセンス<ruby>本文<rt>ほんぶん</rt></ruby>は<ruby>変更<rt>へんこう</rt></ruby>しません。

## <ruby>行動<rt>こうどう</rt></ruby>のルール

- ほかの<ruby>人<rt>ひと</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にしてください。
- <ruby>強<rt>つよ</rt></ruby>い<ruby>言葉<rt>ことば</rt></ruby>で<ruby>責<rt>せ</rt></ruby>めないでください。
- <ruby>意見<rt>いけん</rt></ruby>がちがっても、ていねいに<ruby>話<rt>はな</rt></ruby>してください。
- わからないことは<ruby>質問<rt>しつもん</rt></ruby>してください。

小さな<ruby>修正<rt>しゅうせい</rt></ruby>でも<ruby>歓迎<rt>かんげい</rt></ruby>します。
