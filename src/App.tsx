import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Header from './components/Header'
import Sound from './components/Sound'
import MessageWindow from './components/MessageWindow'
import Top from './components/Top'
import Footer from './components/Footer';

declare global { interface Window { cback: any } }

type Recipe = {
  name: string
  amount: string
}

type Ingredient = {
  name: string
  url: string
  image: string
}

function App() {
  const [message, setMessage] = useState('いらっしゃいませ。\nここでは、お客さんが最高のお酒に出会えるよう、お手伝いをしています。')
  const [displayMessage, setDisplayMessage] = useState('')
  const [displayChoices, setDisplayChoices] = useState(false)
  const [displayReturnToStart, setDisplayReturnToStart] = useState(false)
  const [displayCocktailRecipie, setDisplayCocktailRecipie] = useState(false)
  const [choices, setChoices] = useState(['自分に合ったお酒を探したい', '家飲み用のおつまみが知りたい', '近くにいいお店がないか探したい'])
  const [result, setResult] = useState(false)
  const [resultOfCocktail, setResultOfCocktail] = useState(false)
  const [resultOfSearches, setResultOfSearches] = useState(false)
  const [resultURL, setResultURL] = useState('')
  const [resultImage, setResultImage] = useState('')
  const [playing, setPlaying] = useState(false)
  const [searchByLocation, setSearchByLocation] = useState(false)
  const [searchByStation, setSearchByStation] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [cocktailIngredients, setCocktailIngredients] = useState<Ingredient[]>([])
  const [cocktailsRecipes, setCocktailsRecipes] = useState<Recipe[]>([])


  const resetState = () => {
    setMessage('いらっしゃいませ。\nここでは、お客さんが最高のお酒に出会えるよう、お手伝いをしています。')
    setDisplayMessage('')
    setDisplayChoices(false)
    setDisplayReturnToStart(false)
    setDisplayCocktailRecipie(false)
    setChoices(['自分に合ったお酒を探したい', '家飲み用のおつまみが知りたい', '近くにいいお店がないか探したい'])
    setResult(false)
    setResultOfCocktail(false)
    setResultOfSearches(false)
    setResultURL('')
    setResultImage('')
    setSearchByLocation(false)
    setSearchByStation(false)
    setCocktailIngredients([])
    setCocktailsRecipes([])
  }

  const selectMenu = (drink: string, key: number) => {
    // カクテル
    if ('カクテル' === choices[key]) {
      setMessage('家でも楽しめるカクテルか、お店で飲むような本格的なカクテルどちらがよろしいですか？')
      setChoices(['家でも楽しめるカクテルがいい', 'お店で飲むような本格的なカクテルがいい'])
      setDisplayChoices(false)
    }

    // カクテル > 家でも楽しめるカクテルがいい
    if ('家でも楽しめるカクテルがいい' === choices[key]) {
      setMessage('どんなカクテルにしましょう？')
      setChoices(['スッキリしていて爽やかなカクテル', 'オレンジジュースみたいなカクテル', 'トマトのフレッシュなカクテル'])
      setDisplayChoices(false)
    }

    // カクテル > 家でも楽しめるカクテルがいい > スッキリしていて爽やかな酸味のカクテル
    if ('スッキリしていて爽やかなカクテル' === choices[key]) {
      setMessage('ジントニックがおすすめです。\nトニックウォーターとライムが爽やかで万人受けするカクテルです。\n作り方は、以下のレシピ通りに材料を混ぜるだけなので、自宅でも簡単に作れますよ。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ジン',
                         amount: '45ml' }
      const recipie2 = { name: 'トニックウォーター',
                         amount: '適量' }
      const recipie3 = { name: 'ライム',
                         amount: '1/8個' }
      const ingredient1 = { name: 'サントリー ビーフィーター ジン40度',
                            url: 'https://www.amazon.co.jp/dp/B001TYZWKY',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TYZWKY.09.MZZZZZZZ' }
      const ingredient2 = { name: 'ウィルキンソン トニックウォーター',
                            url: 'https://www.amazon.co.jp/dp/B08GFBKBYX',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/41+Eng1scJL._AC_UL232_SR232,232_.jpg' }
      const ingredient3 = { name: 'ライム',
                            url: 'https://www.amazon.co.jp/dp/B07XW8TF6Y',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/61n+ofYsjmL._AC_UL232_SR232,232_.jpg' }

      setCocktailsRecipes([recipie1, recipie2, recipie3])
      setCocktailIngredients([ingredient1, ingredient2, ingredient3])
      setResultImage('')
    }

    // カクテル > 家でも楽しめるカクテルがいい > オレンジジュースみたいなカクテル
    if ('オレンジジュースみたいなカクテル' === choices[key]) {
      setMessage('スクリュードライバーがおすすめです。\nウォッカの辛さと、オレンジジュースの甘さがマッチして、スッキリと飲みやすいカクテルになっています。\n以下のレシピ通りに材料を混ぜるだけで、自宅でも簡単に作れますよ。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ジャパニーズ クラフトウォッカ Haku (白)',
                         amount: '45ml' }
      const recipie2 = { name: 'オレンジジュース',
                         amount: '適量' }
      const ingredient1 = { name: 'ジャパニーズ クラフトウォッカ Haku (白)',
                            url: 'https://www.amazon.co.jp/dp/B07NDR5W3P',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B07NDR5W3P.09.MZZZZZZZ' }
      const ingredient2 = { name: "アサヒ飲料 Welch's(ウェルチ) オレンジ100",
                            url: 'https://www.amazon.co.jp/dp/B007NCSI6Q',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B007NCSI6Q.09.MZZZZZZZ' }

      setCocktailsRecipes([recipie1, recipie2])
      setCocktailIngredients([ingredient1, ingredient2])
      setResultImage('')
    }

    // カクテル > 家でも楽しめるカクテルがいい > トマトのフレッシュなカクテル
    if ('トマトのフレッシュなカクテル' === choices[key]) {
      setMessage('レッド・アイがおすすめです。\nビールとトマトジュースを半分ずつ混ぜるだけで簡単に作れちゃいます。\n私がレッド・アイを作る時は、ハマグリのエキスが入った「クラマト」というトマトジュースを使うのですが、これがメチャクチャ美味しいのでぜひ使ってみて下さい。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ビール',
                         amount: '1/2' }
      const recipie2 = { name: 'トマトジュース',
                         amount: '1/2' }
      const ingredient1 = { name: 'サッポロ 生ビール 黒ラベル',
                            url: 'https://www.amazon.co.jp/dp/B001TRIKRS',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TRIKRS.09.MZZZZZZZ' }
      const ingredient2 = { name: "モッツ クラマト トマトカクテル",
                            url: 'https://www.amazon.co.jp/dp/B008PAWAFK',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/41+o9HfjMoL._AC_UL232_SR232,232_.jpg' }

      setCocktailsRecipes([recipie1, recipie2])
      setCocktailIngredients([ingredient1, ingredient2])
      setResultImage('')
    }

    // カクテル > お店で飲むような本格的なカクテルがいい
    if ('お店で飲むような本格的なカクテルがいい' === choices[key]) {
      setMessage('どんなカクテルにしますか？')
      setChoices(['ロマンチックなカクテル', '爽やかで上品なカクテル', '甘ずっぱくて爽快感のあるカクテル'])
      setDisplayChoices(false)
    }

    // カクテル > お店で飲むような本格的なカクテルがいい > ロマンチックなカクテル
    if ('ロマンチックなカクテル' === choices[key]) {
      setMessage('サイドカーがおすすめです。\nサイドカーは、「いつもふたりで」という意味のあるロマンチックなカクテルです。\nブランデーの深い味わいと、ホワイトキュラソーの柑橘系の香りが魅力的なので、ぜひ飲んでみて下さい。\n作り方は、以下のレシピをシェークして作ります。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ブランデー',
                         amount: '2/4' }
      const recipie2 = { name: 'ホワイトキュラソー',
                         amount: '1/4' }
      const recipie3 = { name: 'レモンジュース',
                         amount: '1/4' }
      const ingredient1 = { name: 'クルボアジェ VSOP ルージュ',
                            url: 'https://www.amazon.co.jp/dp/B01LYR2ZNR',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B01LYR2ZNR.09.MZZZZZZZ' }
      const ingredient2 = { name: 'サントリー ヘルメス ホワイトキュラソー',
                            url: 'https://www.amazon.co.jp/dp/B0034XNELW',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B0034XNELW.09.MZZZZZZZ' }
      const ingredient3 = { name: 'レモンジュース',
                            url: 'https://www.amazon.co.jp/dp/B001TOZU2Y',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TOZU2Y.09.MZZZZZZZ' }
      const ingredient4 = { name: 'マジックバーテンダーキット',
                            url: 'https://www.amazon.co.jp/dp/B097BF3TW3',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/61aRPI+tvGL._AC_UL232_SR232,232_.jpg' }

      setCocktailsRecipes([recipie1, recipie2, recipie3])
      setCocktailIngredients([ingredient1, ingredient2, ingredient3, ingredient4])
      setResultImage('')
    }

    if ('爽やかで上品なカクテル' === choices[key]) {
      setMessage('ホワイト・レディがおすすめです。\n白い貴婦人の名に相応しく、爽やかで上品な味わいが楽しめます。ジンの辛さとレモンの酸味が合わさって最高に美味しいです。\n作り方は、以下のレシピをシェークして作ります。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ジン',
                         amount: '2/4' }
      const recipie2 = { name: 'ホワイトキュラソー',
                         amount: '1/4' }
      const recipie3 = { name: 'レモンジュース',
                         amount: '1/4' }
      const ingredient1 = { name: 'サントリー ビーフィーター ジン40度',
                            url: 'https://www.amazon.co.jp/dp/B001TYZWKY',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TYZWKY.09.MZZZZZZZ' }
      const ingredient2 = { name: 'サントリー ヘルメス ホワイトキュラソー',
                            url: 'https://www.amazon.co.jp/dp/B0034XNELW',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B0034XNELW.09.MZZZZZZZ' }
      const ingredient3 = { name: 'レモンジュース',
                            url: 'https://www.amazon.co.jp/dp/B001TOZU2Y',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TOZU2Y.09.MZZZZZZZ' }
      const ingredient4 = { name: 'マジックバーテンダーキット',
                            url: 'https://www.amazon.co.jp/dp/B097BF3TW3',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/61aRPI+tvGL._AC_UL232_SR232,232_.jpg' }

      setCocktailsRecipes([recipie1, recipie2, recipie3])
      setCocktailIngredients([ingredient1, ingredient2, ingredient3, ingredient4])
      setResultImage('')
    }

    // カクテル > お店で飲むような本格的なカクテルがいい > 甘ずっぱくて爽快感のあるカクテル
    if ('甘ずっぱくて爽快感のあるカクテル' === choices[key]) {
      setMessage('ダイキリがおすすめです。\nラム酒にライムと砂糖を入れただけという、シンプル イズ ベストなカクテルです。\n甘い方がお好みの場合は、砂糖を多めに入れて調節して下さいね。\n作り方は、以下のレシピをシェークして作ります。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      const recipie1 = { name: 'ブランデー',
                         amount: '1/2' }
      const recipie2 = { name: 'ライムジュース',
                         amount: '1/4' }
      const recipie3 = { name: 'シュガーシロップ',
                         amount: 'ティースプーン1杯' }
      const ingredient1 = { name: 'サントリー ロンリコ ホワイト',
                            url: 'https://www.amazon.co.jp/dp/B001TZAZ00',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B001TZAZ00.09.MZZZZZZZ' }
      const ingredient2 = { name: 'ポッカ お酒にプラスライム',
                            url: 'https://www.amazon.co.jp/dp/B00812C26E',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B00812C26E.09.MZZZZZZZ' }
      const ingredient3 = { name: 'キーコーヒー シュガーシロップ ポーション',
                            url: 'https://www.amazon.co.jp/dp/B00NSP4RWQ',
                            image: 'https://images-na.ssl-images-amazon.com/images/P/B00NSP4RWQ.09.MZZZZZZZ' }
      const ingredient4 = { name: 'マジックバーテンダーキット',
                            url: 'https://www.amazon.co.jp/dp/B097BF3TW3',
                            image: 'https://images-fe.ssl-images-amazon.com/images/I/61aRPI+tvGL._AC_UL232_SR232,232_.jpg' }

      setCocktailsRecipes([recipie1, recipie2, recipie3])
      setCocktailIngredients([ingredient1, ingredient2, ingredient3, ingredient4])
      setResultImage('')
    }

    if ('近くにいいお店がないか探したい' === choices[key]) {
      setMessage('飲食店には、かなり詳しいですよ!\n現在位置からお店を探しましょうか？\nそれとも、最寄りの駅から探しますか?')
      setChoices(['現在位置から探す', '最寄りの駅から探す'])
      setDisplayChoices(false)
    }

    if ('現在位置から探す' === choices[key]) {
      setMessage('お使いのブラウザの位置情報取得を許可しておいて下さいね。\nもし、探したいお店の種類や条件があったら教えて下さい。')
      setChoices([])
      setSearchByLocation(true)
      setDisplayChoices(false)
    }

    if ('最寄りの駅から探す' === choices[key]) {
      setMessage('都道府県と駅名を教えて頂けませんか？\n探したいお店の種類や条件があったら、それも教えて下さい。')
      setChoices([])
      setSearchByStation(true)
      setDisplayChoices(false)
    }

    if ('自分に合ったお酒を探したい' === choices[key]) {
      setMessage('探したいお酒の種類を教えて下さい。')
      setChoices(['ウィスキー', 'ビール', 'ワイン', 'カクテル', 'マスターのおすすめは？'])
      setDisplayChoices(false)
    }

    if ('家飲み用のおつまみが知りたい' === choices[key]) {
      setMessage('どんなおつまみが食べたいですか？')
      setChoices(['小料理っぽいのがいい', '魚がいいな', 'ナッツにしたい', 'チーズの気分'])
      setDisplayChoices(false)
    }

    // 家飲み用のおつまみが知りたい > 小料理っぽいのがいい
    if ('小料理っぽいのがいい' === choices[key]) {
      setMessage('缶つま 6缶詰め合わせがおすすめです。\n少し値段は高めですが、家飲みでちょっと贅沢な気分になれますよ!')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0978LVFMP')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/71yYid7G02L._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // 家飲み用のおつまみが知りたい > 魚がいいな
    if ('魚がいいな' === choices[key]) {
      setMessage('THE さBAR ザ・サバーがおすすめです。\n鯖の燻製なのですが、スモーキーさは少なくクセがないので、どなたでもお召し上がりになれると思います。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B07CRNF4PL')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B07CRNF4PL.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // 家飲み用のおつまみが知りたい > ナッツにしたい
    if ('ナッツにしたい' === choices[key]) {
      setMessage('食いしんBAR 素焼ミックスナッツ 徳用 300gがおすすめです。\nナッツはどんなお酒にでも合うので、私はミックスナッツを大量に備蓄してるんですよね。お徳用で買うのおすすめですよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B09F9MG59N')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/71Z52hXV0HL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // 家飲み用のおつまみが知りたい > チーズの気分
    if ('チーズの気分' === choices[key]) {
      setMessage('チーズコレクション アソート バルク 500gがおすすめです。\nこれ色んな種類のチーズが入っているので、飽きなくていいですよ。KALDIにもう少し小さいサイズが置いてあるのを見たので、近くにKALDIがある方は、小さいサイズで試してみると良いかもしれませんね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B09MDZ52QF')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/51gbTjM-uBL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // マスターのおすすめは？
    if ('マスターのおすすめは？' === choices[key]) {
      setMessage('シーバスリーガル ミズナラがおすすめです。\n海外メーカーのシーバスリーガルが、日本のウィスキーファンのためにブレンドしたウィスキーがこの「ミズナラ」なんです。\n甘めの風味で口当たりも良いので、普段ウィスキーを飲まれない方にもおすすめ出来ます。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00FBC99XQ')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00FBC99XQ.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン
    if ('ワイン' === choices[key]) {
      setMessage('赤ワインと白ワインどちらが良いでしょうか？\n赤ワインは肉料理、白ワインは魚介類やパスタと合わせて飲むのがおすすめです。')
      setChoices(['赤ワインが飲みたいな', '白ワインが飲みたいな'])
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン
    if ('赤ワインが飲みたいな' === choices[key]) {
      setMessage('どんなワインがお好みですか？')
      setChoices(['濃厚で飲み応えのあるワイン', 'アーティスティックなワイン', '軽やかでさっぱりしたワイン'])
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > 濃厚で飲み応えのあるワイン
    if ('濃厚で飲み応えのあるワイン' === choices[key]) {
      setMessage('モンテプルチャーノ ダブルッツォがおすすめです。\nこちらは、1本の樹に2房しか実がならない葡萄を使った贅沢なワインです。\nしかもその2房には栄養が集中するので、濃厚な果実感出るんですよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001M3JY5G')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/717kzY2li6L._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > アーティスティックなワイン
    if ('アーティスティックなワイン' === choices[key]) {
      setMessage('オノロ ベラがおすすめです。\nこちらのワインは、カシスのようなフルーティーな香りと味わいが楽しめます。\n値段は安く庶民派なワインなのですが、アカデミー賞のパーティーで飲まれたことがあるんです。\nアートを感じさせるラベルも特徴的ですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00IRR9U22')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00IRR9U22.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > 軽やかでさっぱりしたワイン
    if ('軽やかでさっぱりしたワイン' === choices[key]) {
      setMessage('フランジアがおすすめです。\nライトで軽やかな口当たりで、食事を邪魔しない普段使いのワインとしておすすめです。\n口に含んだ時に広がる、ラズベリーやチェリーのような香りがいいですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B002JN4NS6')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B002JN4NS6.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン
    if ('白ワインが飲みたいな' === choices[key]) {
      setMessage('どんなワインがお好みですか？')
      setChoices(['辛口でさっぱりしたワイン', 'マスカットの甘さを感じるワイン', 'デザートのようなワイン'])
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > 辛口でさっぱりした飲み口のワイン
    if ('辛口でさっぱりしたワイン' === choices[key]) {
      setMessage('パスクァ ビアンコ・デル・ヴェネトがおすすめです。\n辛口でスッキリした飲み口の中にフルーティーな甘さを感じます。\nお食事に良く合いますし、お値段もお手頃なので普段使いの白ワインとしていかがでしょうか。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00335QXD2')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00335QXD2.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > マスカットの甘さを感じるワイン
    if ('マスカットの甘さを感じるワイン' === choices[key]) {
      setMessage('イエローテイル モスカートがおすすめです。\nこちらはマスカットのフルーティーでフレッシュな味わいが楽しめます。\n甘口で飲みやすいので、初心者にもおすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B003DU4SDO')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B003DU4SDO.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > デザートのようなワイン
    if ('デザートのようなワイン' === choices[key]) {
      setMessage('サンテロ　天使のアスティがおすすめです。\nこちらは甘口のスパークリングワインになります。\nすごく甘いくジュースのようなので、お食事というよりは、食後にデザートと一緒に飲まれると良いと思いますよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0036RAU68')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/71n8Dxp8oCL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // ビール
    if ('ビール' === choices[key]) {
      setMessage('一般的なビールと個性派なビールどちらが良いですか？\n')
      setChoices(['一般的なビール', '個性的なビール'])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール
    if ('一般的なビール' === choices[key]) {
      setMessage('どんなビールが好きですか？')
      setChoices(['旨味とコクが欲しい', 'キレと爽快感が欲しい', 'バランス感のあるビール',])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール
    if ('一般的なビール' === choices[key]) {
      setMessage('どんなビールが好きですか？')
      setChoices(['どんな料理にも合うビール', '香りや風味を味わうビール', '旨味とコクのあるビール', 'キレと爽快感のあるビール'])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > どんな料理にも合うビール
    if ('どんな料理にも合うビール' === choices[key]) {
      setMessage('キリン 一番搾りがおすすめです。\n味や香りにバランス感があり、どんな料理にも合うビールです。\n雑味も少なく、人を選ばない汎用性のあるビールだと思います。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01BM9ECRE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01BM9ECRE.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > 香りや風味を味わうビール
    if ('香りや風味を味わうビール' === choices[key]) {
      setMessage('サッポロ黒ラベルがおすすめです。\nホップの香りや風味が良く、苦さの中に旨味も感じられます。\n味のバランスが良く、料理の邪魔をしないので、私も食事と一緒によく飲んでいますよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TRIKRS')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TRIKRS.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > 旨味とコクのあるビール
    if ('旨味とコクのあるビール' === choices[key]) {
      setMessage('ヱビスビールがおすすめです。\nホップの香りや濃厚な味わいが楽しめます。ビールのコクと旨味を味わいたければヱビスビールですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01C84VRXE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01C84VRXE.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

     // ビール > 一般的なビール > キレと爽快感のあるビール
     if ('キレと爽快感のあるビール' === choices[key]) {
      setMessage('アサヒ スーパードライがおすすめです。\n辛口で、味のキレと爽快感があるので、仕事終わりやお風呂に入った後にグイッといきたい時はこれで決まりです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0029ZFYJQ')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0029ZFYJQ.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール
    if ('個性的なビール' === choices[key]) {
      setMessage('どんなビールが好きですか？')
      setChoices(['柑橘系のフレッシュなビール', 'シトラスの香りを楽しむビール', '苦味とコクを味わうビール'])
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > 柑橘系のフレッシュなビール
    if ('柑橘系のフレッシュなビール' === choices[key]) {
      setMessage('よなよなエールがおすすめです。\n柑橘系のフレッシュな香りとフルーティーな味わいが飲みやすく、ビール初心者の方にもおすすめ出来ます。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0069FI26O')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0069FI26O.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > シトラスの香りを楽しむビール
    if ('シトラスの香りを楽しむビール' === choices[key]) {
      setMessage('COEDOビール毱花をおすすめします。\nビールの苦味の中にシトラスの香りが感じられるビールです。\n普通のビールに飽きたら毱花を味わってみて下さい。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0775S7YQ3')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/41ehPL1uSmL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > 苦味とコクを味わうビール
    if ('苦味とコクを味わうビール' === choices[key]) {
      setMessage('インドの青鬼がおすすめです。\nしっかりとビールの苦味が感じられるため、ビール好きのためのビールですね。\nビールの美味しさを存分に味わいたい人におすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0069FI6B0')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0069FI6B0.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー
    if ('ウィスキー' === choices[key]) {
      setMessage('いくつか質問させて頂きますね。\nお客さんは、クセが少なく飲みやすいウィスキーがお好みでしょうか？')
      setChoices(['クセのない方が好き', 'クセがあっても大丈夫'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き
    if ('クセのない方が好き' === choices[key]) {
      setMessage('どんな味わいのウィスキーが飲みたいですか？')
      setChoices(['シンプルでスッキリしたウィスキー', 'マイルドで飲みやすいウィスキー', '爽やかなウィスキー'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > シンプルでスッキリしたウィスキー
    if ('シンプルでスッキリしたウィスキー' === choices[key]) {
      setMessage('サントリーの角瓶がおすすめです。\n香りやコクのバランスがとれており、ドライな口当たりが特徴です。\n飲み方は、ソーダ割りが個人的におすすめですね。\nドライでサッパリしているのでお食事にも合わせやすいです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01CXSRJHI')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01CXSRJHI.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > マイルドで飲みやすいウィスキー
    if ('マイルドで飲みやすいウィスキー' === choices[key]) {
      setMessage('メーカーズマークがおすすめです。\n味は、バニラやはちみつの甘みが感じられ、スムースな飲み口が特徴です。\nメーカーズマークは、バーボンウィスキーの定番なので、数多くのバーや酒屋で取り扱っていて、手に入りやすいのも良い所ですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01MZ2B5GO')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01MZ2B5GO.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > 爽やかなウィスキー
    if ('爽やかなウィスキー' === choices[key]) {
      setMessage('知多がおすすめです。\nハイボールにすると優しい香りが引き立ち、爽やかな印象のウィスキーになります。\n食事との相性も良いので、夕食のお供にどうぞ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01610C1UY')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01610C1UY.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫
    if ('クセがあっても大丈夫' === choices[key]) {
      setMessage('どんな味わいがお好きでしょうか？')
      setChoices(['コクと甘みを感じるウィスキー', 'スモーキーでほのかに甘いウィスキー', '最強にスモーキーなウィスキー'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > コクと甘みを感じるウィスキー
    if ('コクと甘みを感じるウィスキー' === choices[key]) {
      setMessage('ワイルドターキーがおすすめです。\nバーボン特有の甘みがあり、濃厚なコクが感じられるウィスキーです。\n値段もお手頃でコスパが良いので、普段飲みのバーボンとしておすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B078HQ6LDF')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B078HQ6LDF.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > 爽やかなウィスキー
    if ('スモーキーでほのかに甘いウィスキー' === choices[key]) {
      setMessage('ボウモアがおすすめです。\nスモーキーで少し甘みを感じる味が特徴です。\n少しクセはありますが、ハマると飲み続けてしまう中毒性がありますね。\n私も一時期ハマってよく飲んでいました。\nスコッチに興味があれば、一度は飲んで頂きたいウィスキーです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TP8L3S')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TP8L3S.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > 最強にスモーキーなウィスキー
    if ('最強にスモーキーなウィスキー' === choices[key]) {
      setMessage('アードベッグ飲むしかないですね！アードベッグ 10年はいかがでしょうか？\nこれは、他のスコッチで物足りなくなった人が最終的に行き着くお酒ですね。\n私も飲むんですが、休日前にアードベッグをガツんと飲んで、夜更かししてまどろんでいる時間が最高ですよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B008U7SUDE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B008U7SUDE.09.MZZZZZZZ')
      setDisplayChoices(false)
    }
  }

  // const [i, setI] = useState(1)

  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

  const setInteger = async () => {
    let length = message.length
    for (let i = 0; i < (length + 1); i++) {
      setDisplayMessage(message.slice(0, i))
      console.log(i)
      await sleep(7);
    }
    await sleep(100);
    if (!result && !resultOfCocktail) {
      setDisplayChoices(true)
    } else if(resultOfCocktail) {
      setDisplayCocktailRecipie(true)
      setDisplayReturnToStart(true)
    } else {
      setDisplayReturnToStart(true)
    }
  }

  useEffect(() => {
    setInteger()
  }, [message]);


  // const [currentPost, setCurrentPost] = useState([]);

  const [isAvailable, setAvailable] = useState(false);


  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  if (isFirstRef.current) return <div className="App">Loading...</div>;

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div style={{ display: isStarted ? 'none' : '' }}>
          <Top setIsStarted={setIsStarted} setPlaying={setPlaying} setInteger={setInteger}/>
        </div>
        <div style={{ display: isStarted ? '' : 'none' }}>
          <Sound playing={playing} setPlaying={setPlaying} />
          <div className="main_screen">
          </div>
          <MessageWindow
            result={result}
            resultURL={resultURL}
            resultImage={resultImage}
            displayMessage={displayMessage}
            choices={choices}
            displayChoices={displayChoices}
            selectMenu={selectMenu}
            isFirstRef={isFirstRef}
            isAvailable={isAvailable}
            searchByLocation={searchByLocation}
            searchByStation={searchByStation}
            setMessage={setMessage}
            resultOfCocktail={resultOfCocktail}
            cocktailsRecipes={cocktailsRecipes}
            cocktailIngredients={cocktailIngredients}
            resetState={resetState}
            displayReturnToStart={displayReturnToStart}
            displayCocktailRecipie={displayCocktailRecipie}
            resultOfSearches={resultOfSearches}
            setResultOfSearches={setResultOfSearches}
            // setDisplayChoices={setDisplayChoices}
          />
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default App;