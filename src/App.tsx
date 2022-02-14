import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import Header from './components/Header'
import MessageWindow from './components/MessageWindow'

declare global { interface Window { cback: any } }

function App() {
  const [message, setMessage] = useState('どういったお酒にしましょうか？')
  const [displayMessage, setDisplayMessage] = useState('')
  const [displayChoices, setDisplayChoices] = useState(false)
  const [whisky, setWhisky] = useState(false)
  const [choices, setChoices] = useState(['ウィスキー', 'ビール'])
  const [result, setResult] = useState(false)
  const [resultURL, setResultURL] = useState('')
  const [resultImage, setResultImage] = useState('')
  const [playing, setPlaying] = useState(false)

  const selectMenu = (drink: string, key: number) => {
    if ('ウィスキー' === choices[key]) {
      console.log('whisky')
      setWhisky(true)
      setMessage('どんなウィスキーにしますか？')
      setChoices(['私の好みに合わせておすすめ教えて', 'マスターのおすすめを教えて'])
      setDisplayChoices(false)
    }

    // ウィスキー
    if ('私の好みに合わせておすすめ教えて' === choices[key]) {
      setWhisky(true)
      setMessage('では、いくつか質問させて下さい。\nお客さんは、クセが少なく飲みやすいウィスキーがお好みでしょうか？')
      setChoices(['クセのない方が好き', 'クセがあっても大丈夫'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて
    if ('クセのない方が好き' === choices[key]) {
      setWhisky(true)
      setMessage('どんな味わいのウィスキーが飲みたいでしょうか？')
      setChoices(['シンプルでスッキリしたウィスキー', 'マイルドで飲みやすいウィスキー', '華やかな香りのウィスキー'])
      setDisplayChoices(false)
    }

    // ウィスキー > 私の好みに合わせておすすめ教えて > シンプルでスッキリしたウィスキー
    if ('シンプルでスッキリしたウィスキー' === choices[key]) {
      setWhisky(true)
      setMessage('サントリーの角瓶がおすすめです。\n香りやコクのバランスがとれており、ドライな口当たりが特徴です。\n飲み方は、ソーダ割りが個人的におすすめですね。\nドライでサッパリしているのでお食事にも合わせやすいです。')
      setResult(true)
      setResultURL('https://www.amazon.co.jp/dp/B01CXSRJHI')
      setResultImage('https://images-na.ssl-images-amazon.com/images/P/B01CXSRJHI.09.MZZZZZZZ')
      setDisplayChoices(false)
    }
  }

  const [i, setI] = useState(1)

  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

  const setInteger = async () => {
    let length = message.length
    for (let i = 0; i < (length + 1); i++) {
      setDisplayMessage(message.slice(0, i))
      console.log(i)
      await sleep(20);
    }
    await sleep(100);
    setDisplayChoices(true)
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
        <Header playing={playing} setPlaying={setPlaying}/>
        {console.log(process.env.REACT_APP_SOUND_FILE)}
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
        />
       </div>
    </div>
  );
}

export default App;
