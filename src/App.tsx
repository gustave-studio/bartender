import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
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

  const selectMenu = (drink: string, key: number) => {
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

    // ビール
    if ('ビール' === choices[key]) {
      setWhisky(true)
      setMessage('一般的なビールと個性派なビールどちらが良いですか？\n')
      setChoices(['一般的なビール', '個性派なビール'])
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
      setMessage('サッポロ黒ラベルがおすすめです。\n味や香りにバランス感があり、どんな料理にも合うビールです。\nあまり人を選ばない汎用性のあるビールだと思います。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B001TRIKRS')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B001TRIKRS.09.MZZZZZZZ')
      setDisplayChoices(false)
    }

    // ビール > 一般的なビール > 香りや風味を味わうビール
    if ('香りや風味を味わうビール' === choices[key]) {
      setWhisky(true)
      setMessage('ヱビスビールがおすすめです。\nホップの香りや濃厚な味わいが楽しめます。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01C84VRXE')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01C84VRXE.09.MZZZZZZZ')
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
    if (!result) {
      setDisplayChoices(true)
    }
  }

  useEffect(() => {
    setInteger()
  }, [message]);

  const [prefecture, setPrefecture] = useState("北海道");
  const [station, setStation] = useState("札幌");
  
  const [responseData, setResponseData] = useState([]);

  const jsonpAdapter = require('axios-jsonp')

  const fetchHotpepperAPI = async (x: string, y: string) => {
    const api_key = process.env.REACT_APP_HOTPEPPER_API_KEY
    await axios.get(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${api_key}&lat=${y}&lng=${x}&range=3&order=4&count=100&format=jsonp`, {
      adapter: jsonpAdapter
    })
    .then((response: any) => {
      console.log('----response.data')
      console.log(response.data.results)
      setResponseData(response.data.results.shop)
    })
  }

  const searchRestaurant = async () => {
    await axios.get(`https://express.heartrails.com/api/json?method=getStations&name=${station}&prefecture=${prefecture}`)
      .then((response: any) => {
      fetchHotpepperAPI(response.data.response.station[0].x, response.data.response.station[0].y)
    })
  }

  const [loadIndex, setLoadIndex] = useState(5);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [currentPost, setCurrentPost] = useState([]);

  const displayMore = () => {
    if (loadIndex > responseData.length) {
      setIsEmpty(true);
    } else {
      setLoadIndex(loadIndex + 5);
    }
  };

  const shopInfo = () => {
    return (
      <>
      <div>この辺のお店はもう行きました？</div>
      <br />
      <div>
        { 
          responseData.slice(0, loadIndex).map((data, key) => {
            return (
              <Grid container className="grid_container" key={key}>
                  <Grid item xs={2} >
                  <div className="shop_logo_image">
                    <img
                      src={data['logo_image']}
                      alt="shop_logo_image" />
                  </div>
                  </Grid>
                    <Grid item xs={9} >
                    <div className="">
                     <Card>
                     <CardContent>
                     <div key={key}>
                       <a href={data['urls']['pc']}>
                         {data['name']}
                       </a>
                     </div>
                      </CardContent>
                     </Card>
                     </div>
                 </Grid>
                 <Grid item xs={1} />
              </Grid>       
            )
          })
        }
      </div>
      <Button
              disabled={isEmpty ? true : false}
              onClick={displayMore}
              variant="contained"
            >
              さらに表示
      </Button>
      </>
    )
  }

  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
      console.log('-----')
      console.log(typeof(latitude))
      fetchHotpepperAPI(String(longitude), String(latitude))
    });
  };

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
            setPrefecture={setPrefecture}
            station={station}
            setStation={setStation}
            searchRestaurant={searchRestaurant}
            responseData={responseData}
            shopInfo={shopInfo}
            isFirstRef={isFirstRef}
            isAvailable={isAvailable}
            getCurrentPosition={getCurrentPosition}
            position={position}
            searchByLocation={searchByLocation}
            searchByStation={searchByStation}
          />
          </div>
        </div>
    </div>
  );
}

export default App;
