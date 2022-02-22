import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Header from './components/Header'
import Sound from './components/Sound'
import MessageWindow from './components/MessageWindow'
import Top from './components/Top'

declare global { interface Window { cback: any } }

function App() {
  const [message, setMessage] = useState('いらっしゃいませ。\nここでは、お客さんが最高のお酒に出会えるよう、お手伝いをしています。')
  const [displayMessage, setDisplayMessage] = useState('')
  const [displayChoices, setDisplayChoices] = useState(false)
  const [whisky, setWhisky] = useState(false)
  const [choices, setChoices] = useState(['自分に合ったお酒を探したい', '近くにいいお店がないか探したい'])
  const [result, setResult] = useState(false)
  const [resultURL, setResultURL] = useState('')
  const [resultImage, setResultImage] = useState('')
  const [playing, setPlaying] = useState(false)
  const [searchByLocation, setSearchByLocation] = useState(false)
  const [searchByStation, setSearchByStation] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  type Recipe = {
    name: string
    amount: string
  }

  type Ingredient = {
    name: string
    url: string
    image: string
  }

  const [resultOfCocktail, setResultOfCocktail] = useState(false)
  const [cocktailIngredients, setCocktailIngredients] = useState<Ingredient[]>([])
  const [cocktailsRecipes, setCocktailsRecipes] = useState<Recipe[]>([])

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
      setChoices(['スッキリしていて爽やかな酸味のカクテル', 'オレンジジュースみたいなカクテル', 'トマトのフレッシュなカクテル'])
      setDisplayChoices(false)
    }

    // ワイン > 家でも楽しめるカクテルがいい > スッキリしていて爽やかな酸味のカクテル
    if ('スッキリしていて爽やかな酸味のカクテル' === choices[key]) {
      setMessage('ジントニックがおすすめです。')
      setResultOfCocktail(true)
      setDisplayChoices(false)
      console.log('displayChoices！！！')
      console.log(displayChoices)
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
      setResultImage('https://www.suntory.co.jp/wnb/img/cocktail/p_gin_tonic.gif')
    }

    // ワイン > 赤ワイン > フルーティーでアーティスティックなワイン
    if ('フルーティーでアーティスティックなワイン' === choices[key]) {
      setWhisky(true)
      setMessage('オノロ ベラがおすすめです。\nこちらのワインは、カシスのようなフルーティーな香りと味わいが楽しめます。\n値段は安く庶民派なワインなのですが、アカデミー賞のパーティーで飲まれたことがあるんです。\nアートを感じさせるラベルも特徴的ですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00IRR9U22')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00IRR9U22.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > 軽やかでさっぱりしたワイン
    if ('軽やかでさっぱりしたワイン' === choices[key]) {
      setWhisky(true)
      setMessage('フランジアがおすすめです。\nライトで軽やかな口当たりで、食事を邪魔しない普段使いのワインとしておすすめです。\n口に含んだ時に広がる、ラズベリーやチェリーのような香りがいいですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B002JN4NS6')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B002JN4NS6.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン
    if ('白ワインが飲みたいな' === choices[key]) {
      setWhisky(true)
      setMessage('どんなワインがお好みですか？')
      setChoices(['辛口でさっぱりしたワイン', 'マスカットの甘さを感じるワイン', 'デザートのようなワイン'])
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > 辛口でさっぱりした飲み口のワイン
    if ('辛口でさっぱりしたワイン' === choices[key]) {
      setWhisky(true)
      setMessage('パスクァ ビアンコ・デル・ヴェネトがおすすめです。\n辛口でスッキリした飲み口の中にフルーティーな甘さを感じます。\nお食事に良く合いますし、お値段もお手頃なので普段使いの白ワインとしていかがでしょうか。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00335QXD2')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00335QXD2.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > マスカットの甘さを感じるワイン
    if ('マスカットの甘さを感じるワイン' === choices[key]) {
      setWhisky(true)
      setMessage('イエローテイル モスカートがおすすめです。\nこちらはマスカットのフルーティーでフレッシュな味わいが楽しめます。\n甘口で飲みやすいので、初心者にもおすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B003DU4SDO')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B003DU4SDO.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > デザートのようなワイン
    if ('デザートのようなワイン' === choices[key]) {
      setWhisky(true)
      setMessage('サンテロ　天使のアスティがおすすめです。\nこちらは甘口のスパークリングワインになります。\nすごく甘いくジュースのようなので、お食事というよりは、食後にデザートと一緒に飲まれると良いと思いますよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0036RAU68')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/71n8Dxp8oCL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    if ('近くにいいお店がないか探したい' === choices[key]) {
      setMessage('飲食店には、かなり詳しいですよ!\n現在位置からお店を探しましょうか？\nそれとも、最寄りの駅から探しますか?')
      setChoices(['現在位置から探す', '最寄りの駅から探す'])
      setDisplayChoices(false)
    }

    if ('現在位置から探す' === choices[key]) {
      setMessage('お使いのブラウザの位置情報取得を許可しておいて下さいね。\n')
      setChoices([])
      setSearchByLocation(true)
      setDisplayChoices(false)
    }

    if ('最寄りの駅から探す' === choices[key]) {
      setMessage('都道府県と駅名を教えて頂けませんか？')
      setChoices([])
      setSearchByStation(true)
      setDisplayChoices(false)
    }

    if ('自分に合ったお酒を探したい' === choices[key]) {
      setMessage('探したいお酒の種類を教えて下さい。')
      setChoices(['ウィスキー', 'ビール', 'ワイン', 'カクテル', 'マスターのおすすめは？', 'お酒はよくわからないのですが・・・'])
      setDisplayChoices(false)
    }

    // ワイン
    if ('ワイン' === choices[key]) {
      setWhisky(true)
      setMessage('赤ワインと白ワインどちらが良いでしょうか？\n赤ワインは肉料理、白ワインは魚介類やパスタと合わせて飲むのがおすすめです。')
      setChoices(['赤ワインが飲みたいな', '白ワインが飲みたいな'])
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン
    if ('赤ワインが飲みたいな' === choices[key]) {
      setWhisky(true)
      setMessage('どんなワインがお好みですか？')
      setChoices(['濃厚で飲み応えのあるワイン', 'フルーティーでアーティスティックなワイン', '軽やかでさっぱりしたワイン'])
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > 濃厚で飲み応えのあるワイン
    if ('濃厚で飲み応えのあるワイン' === choices[key]) {
      setWhisky(true)
      setMessage('モンテプルチャーノ ダブルッツォがおすすめです。\nこちらは、1本の樹に2房しか実がならない葡萄を使った贅沢なワインです。\nしかもその2房には栄養が集中するので、濃厚な果実感出るんですよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001M3JY5G')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/717kzY2li6L._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > フルーティーでアーティスティックなワイン
    if ('フルーティーでアーティスティックなワイン' === choices[key]) {
      setWhisky(true)
      setMessage('オノロ ベラがおすすめです。\nこちらのワインは、カシスのようなフルーティーな香りと味わいが楽しめます。\n値段は安く庶民派なワインなのですが、アカデミー賞のパーティーで飲まれたことがあるんです。\nアートを感じさせるラベルも特徴的ですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00IRR9U22')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00IRR9U22.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 赤ワイン > 軽やかでさっぱりしたワイン
    if ('軽やかでさっぱりしたワイン' === choices[key]) {
      setWhisky(true)
      setMessage('フランジアがおすすめです。\nライトで軽やかな口当たりで、食事を邪魔しない普段使いのワインとしておすすめです。\n口に含んだ時に広がる、ラズベリーやチェリーのような香りがいいですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B002JN4NS6')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B002JN4NS6.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン
    if ('白ワインが飲みたいな' === choices[key]) {
      setWhisky(true)
      setMessage('どんなワインがお好みですか？')
      setChoices(['辛口でさっぱりしたワイン', 'マスカットの甘さを感じるワイン', 'デザートのようなワイン'])
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > 辛口でさっぱりした飲み口のワイン
    if ('辛口でさっぱりしたワイン' === choices[key]) {
      setWhisky(true)
      setMessage('パスクァ ビアンコ・デル・ヴェネトがおすすめです。\n辛口でスッキリした飲み口の中にフルーティーな甘さを感じます。\nお食事に良く合いますし、お値段もお手頃なので普段使いの白ワインとしていかがでしょうか。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B00335QXD2')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B00335QXD2.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > マスカットの甘さを感じるワイン
    if ('マスカットの甘さを感じるワイン' === choices[key]) {
      setWhisky(true)
      setMessage('イエローテイル モスカートがおすすめです。\nこちらはマスカットのフルーティーでフレッシュな味わいが楽しめます。\n甘口で飲みやすいので、初心者にもおすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B003DU4SDO')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B003DU4SDO.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ワイン > 白ワイン > デザートのようなワイン
    if ('デザートのようなワイン' === choices[key]) {
      setWhisky(true)
      setMessage('サンテロ　天使のアスティがおすすめです。\nこちらは甘口のスパークリングワインになります。\nすごく甘いくジュースのようなので、お食事というよりは、食後にデザートと一緒に飲まれると良いと思いますよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0036RAU68')
      setResultImage('https://images-fe.ssl-images-amazon.com/images/I/71n8Dxp8oCL._AC_UL232_SR232,232_.jpg')
      setDisplayChoices(false)
    }

    // ビール
    if ('ビール' === choices[key]) {
      setWhisky(true)
      setMessage('一般的なビールと個性派なビールどちらが良いですか？\n')
      setChoices(['一般的なビール', '個性的なビール'])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール
    if ('一般的なビール' === choices[key]) {
      setWhisky(true)
      setMessage('どんなビールが好きですか？')
      setChoices(['旨味とコクが欲しい', 'キレと爽快感が欲しい', 'バランス感のあるビール',])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール
    if ('一般的なビール' === choices[key]) {
      setWhisky(true)
      setMessage('どんなビールが好きですか？')
      setChoices(['どんな料理にも合うビール', '香りや風味を味わうビール', '旨味とコクのあるビール', 'キレと爽快感のあるビール'])
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > どんな料理にも合うビール
    if ('どんな料理にも合うビール' === choices[key]) {
      setWhisky(true)
      setMessage('キリン 一番搾りがおすすめです。\n味や香りにバランス感があり、どんな料理にも合うビールです。\n雑味も少なく、人を選ばない汎用性のあるビールだと思います。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01BM9ECRE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01BM9ECRE.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > 香りや風味を味わうビール
    if ('香りや風味を味わうビール' === choices[key]) {
      setWhisky(true)
      setMessage('サッポロ黒ラベルがおすすめです。\nホップの香りや風味が良く、苦さの中に旨味も感じられます。\n味のバランスが良く、料理の邪魔をしないので、私も食事と一緒によく飲んでいますよ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TRIKRS')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TRIKRS.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > 旨味とコクのあるビール
    if ('旨味とコクのあるビール' === choices[key]) {
      setWhisky(true)
      setMessage('ヱビスビールがおすすめです。\nホップの香りや濃厚な味わいが楽しめます。ビールのコクと旨味を味わいたければヱビスビールですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01C84VRXE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01C84VRXE.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

     // ビール > 一般的なビール > キレと爽快感のあるビール
     if ('旨味とコクのあるビール' === choices[key]) {
      setWhisky(true)
      setMessage('アサヒ スーパードライがおすすめです。\n辛口で、味のキレと爽快感があるので、仕事終わりやお風呂に入った後にグイッといきたい時はこれで決まりです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0029ZFYJQ')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0029ZFYJQ.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール
    if ('個性的なビール' === choices[key]) {
      setWhisky(true)
      setMessage('どんなビールが好きですか？')
      setChoices(['柑橘系のフレッシュなビール', 'シトラスの香りを楽しむビール', '苦味とコクを味わうビール'])
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > 柑橘系のフレッシュなビール
    if ('柑橘系のフレッシュなビール' === choices[key]) {
      setWhisky(true)
      setMessage('よなよなエールがおすすめです。\n柑橘系のフレッシュな香りとフルーティーな味わいが飲みやすく、ビール初心者の方にもおすすめ出来ます。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0069FI26O')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0069FI26O.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > シトラスの香りを楽しむビール
    if ('シトラスの香りを楽しむビール' === choices[key]) {
      setWhisky(true)
      setMessage('COEDOビール毱花をおすすめします。\nビールの苦味の中にシトラスの香りが感じられるビールです。\n普通のビールに飽きたら毱花を味わってみて下さい。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0775S7YQ3')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0775S7YQ3.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 個性的なビール > 苦味とコクを味わうビール
    if ('苦味とコクを味わうビール' === choices[key]) {
      setWhisky(true)
      setMessage('インドの青鬼がおすすめです。\nしっかりとビールの苦味が感じられるため、ビール好きのためのビールですね。\nビールの美味しさを存分に味わいたい人におすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B0069FI6B0')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B0069FI6B0.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー
    if ('ウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('いくつか質問させて頂きますね。\nお客さんは、クセが少なく飲みやすいウィスキーがお好みでしょうか？')
      setChoices(['クセのない方が好き', 'クセがあっても大丈夫'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き
    if ('クセのない方が好き' === choices[key]) {
      setWhisky(true)
      setMessage('どんな味わいのウィスキーが飲みたいですか？')
      setChoices(['シンプルでスッキリしたウィスキー', 'マイルドで飲みやすいウィスキー', '爽やかなウィスキー'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > シンプルでスッキリしたウィスキー
    if ('シンプルでスッキリしたウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('サントリーの角瓶がおすすめです。\n香りやコクのバランスがとれており、ドライな口当たりが特徴です。\n飲み方は、ソーダ割りが個人的におすすめですね。\nドライでサッパリしているのでお食事にも合わせやすいです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01CXSRJHI')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01CXSRJHI.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > マイルドで飲みやすいウィスキー
    if ('マイルドで飲みやすいウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('メーカーズマークがおすすめです。\n味は、バニラやはちみつの甘みが感じられ、スムースな飲み口が特徴です。\nメーカーズマークは、バーボンウィスキーの定番なので、数多くのバーや酒屋で取り扱っていて、手に入りやすいのも良い所ですね。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01MZ2B5GO')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01MZ2B5GO.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセのない方が好き > 爽やかなウィスキー
    if ('爽やかなウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('知多がおすすめです。\nハイボールにすると優しい香りが引き立ち、爽やかな印象のウィスキーになります。\n食事との相性も良いので、夕食のお供にどうぞ。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01610C1UY')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01610C1UY.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫
    if ('クセがあっても大丈夫' === choices[key]) {
      setWhisky(true)
      setMessage('どんな味わいがお好きでしょうか？')
      setChoices(['コクと甘みを感じるウィスキー', 'スモーキーでほのかに甘いウィスキー', '最強にスモーキーなウィスキー'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > コクと甘みを感じるウィスキー
    if ('コクと甘みを感じるウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('ワイルドターキー 8年がおすすめです。\nバーボン特有の甘みがあり、濃厚なコクが感じられるウィスキーです。\n値段もお手頃でコスパが良いので、普段飲みのバーボンとしておすすめです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TP8L3S')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TP8L3S.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > 爽やかなウィスキー
    if ('スモーキーでほのかに甘いウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('ボウモア 12年がおすすめです。\nスモーキーで少し甘みを感じる味が特徴です。\n少しクセはありますが、ハマると飲み続けてしまう中毒性がありますね。\n私も一時期ハマってよく飲んでいました。\nスコッチに興味があれば、一度は飲んで頂きたいウィスキーです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TP8L3S')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TP8L3S.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > クセがあっても大丈夫 > 最強にスモーキーなウィスキー
    if ('最強にスモーキーなウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('アードベック飲むしかないですね！アードベック 10年はいかがでしょうか？\nこれは、他のスコッチで物足りなくなった人が最終的に行き着くお酒ですね。\n私も飲むんですが、休日前にアードベックをガツんと飲んで、夜更かししてまどろんでいる時間が最高ですよ。')
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
      await sleep(10);
    }
    await sleep(100);
    if (!result && !resultOfCocktail) {
      setDisplayChoices(true)
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
          />
          </div>
        </div>
    </div>
  );
}

export default App;
