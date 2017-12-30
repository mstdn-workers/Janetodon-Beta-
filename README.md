# janetodon

> An electron-vue project

## 備忘録
目先にやることリスト
- tootをクリックすると、詳細に飛ぶ
- mentionが続いてたら詳細の下に並べる
- 詳細画面から戻れる
- ファボとboostが出来る
- OGP使って表示したい
- スクロールバーが一番上にあるときは、取得したtootを順に削除していく(画面内のtootを常に一定個数とする)
- スクロールバーが一番下にあるときは、画面内の最も古いtoot以前のtootを取得する

## 備忘録2
CSSでbackground-colorを選択するときは!importantを

colorをやるときは*でcolorが選択されてるから注意だぞ☆


#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[1c165f7](https://github.com/SimulatedGREG/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
