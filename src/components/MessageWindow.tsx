import React, {useState, useEffect} from 'react';
import { ReactHTMLElement } from 'react';
import Prefectures from '../prefectures.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import ReactLoading from 'react-loading';
import ReturnToStart from './ReturnToStart'

type Recipe = {
    name: string
    amount: string
  }

type Ingredient = {
    name: string
    url: string
    image: string
  }

type MessageWindowPropsType = {
  result: boolean;
  resultURL: string;
  resultImage: string;
  displayMessage: string;
  choices: Array<string>;
  displayChoices: boolean;
  selectMenu(drink: string, key: number): void;
  isFirstRef: object;
  isAvailable: boolean;
  searchByLocation: boolean;
  searchByStation: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  resultOfCocktail: boolean;
  cocktailsRecipes: Array<Recipe>;
  cocktailIngredients: Array<Ingredient>;
  resetState(): void;
  displayReturnToStart: boolean;
  displayCocktailRecipie: boolean;
  resultOfSearches: boolean;
  setResultOfSearches: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageWindow = function (props: MessageWindowPropsType) {
    const [responseData, setResponseData] = useState([]);
    const jsonpAdapter = require('axios-jsonp')
    const [loadIndex, setLoadIndex] = useState(5);
    const [isEmpty, setIsEmpty] = useState(false);
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [prefecture, setPrefecture] = useState("北海道");
    const [station, setStation] = useState("札幌");
    const [isSearching, setIsSearching] = useState(false);
    // const [now, setNow] = useState(Date.now());

    const displayMore = () => {
        if (loadIndex > responseData.length) {
          setIsEmpty(true);
        } else {
          setLoadIndex(loadIndex + 5);
        }
      };

      const fetchHotpepperAPI = async (x: string, y: string) => {
        const api_key = process.env.REACT_APP_HOTPEPPER_API_KEY
        await axios.get(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${api_key}&lat=${y}&lng=${x}&range=3&order=4&count=100&format=jsonp`, {
          adapter: jsonpAdapter
        })
        .then((response: any) => {
            console.log('ホットペッパー取得');
          setResponseData(response.data.results.shop)
          setIsSearching(false)
        })
      }
    
    const searchRestaurant = async () => {
      await axios.get(`https://express.heartrails.com/api/json?method=getStations&name=${station}&prefecture=${prefecture}`)
        .then((response: any) => {
          fetchHotpepperAPI(response.data.response.station[0].x, response.data.response.station[0].y)
      })
    }
    
    const getCurrentPosition = () => {
        setIsSearching(true)
        const timer = setTimeout(() => {
            //some action
            console.log(
              '10 seconds has passed. TimerID ' +
                String(timer) +
                ' has finished.'
            );
            setIsSearching(false)
            props.setMessage('位置情報の設定を確認して、もう一度お試し下さい。')
        }, 8 * 1000);

        console.log('TimerID ' + String(timer) + ' has started.');

        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          console.log('-----!!')
          console.log(typeof(latitude))
          fetchHotpepperAPI(String(longitude), String(latitude))
          clearTimeout(timer)
        });
      };

      const shopInfo = () => {
        props.setMessage('この辺のお店はもう行きました？')
        props.setResultOfSearches(true)
        console.log('resultOfSearches!!!!')
        console.log(props.resultOfSearches)

        return (
          <>
          <div style={{ display: props.resultOfSearches ? '' : 'none' }}>
            <div>
              {
                responseData.slice(0, loadIndex).map((data, key) => {

                    console.log('typeOf')
                    console.log('typeOf')
                  

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
            <div className="show_more_button">
              <Button
                disabled={isEmpty ? true : false}
                onClick={displayMore}
                variant="contained"
              >
                      さらに表示
              </Button>
            </div>
            <br />

            <ReturnToStart resetState={props.resetState} setResponseData={setResponseData}/>
          </div>
          </>
        )
      }

  return (
    <div className="message_window">
    <div className="message">
      バーテンダー： 
      {/* 通常の結果画像 */}
      <div className="result" style={{ display: props.result ? '' : 'none' }}>
        <a href={props.resultURL}>
          <img src={props.resultImage} alt="おすすめ結果" />
          <br />
          Amazonで購入
        </a>
      </div>
      {/* カクテルの結果画像 */}
      <div className="result" style={{ display: props.resultOfCocktail ? '' : 'none' }}>
          <img src={props.resultImage} alt="おすすめ結果" />
      </div>


      {/* メッセージ出力 */}
      { props.displayMessage.split('\n').map((item) => (
          <div key={item}>
            {item}
          </div>
        )) }
      
      {/* 結果画面からスタートへ戻る */}
      <div className="result" style={{ display: props.displayReturnToStart ? '' : 'none' }}>
        <ReturnToStart resetState={props.resetState} setResponseData={setResponseData}/>
      </div >

      <div className="choices" style={{ display: props.displayChoices ? '' : 'none' }}>
        {props.choices.map((choice, key) => (
            <span key={key}>
            <button key={key} onClick={() => props.selectMenu(choice, key)}>・{choice}</button>
            <br />
            </span>
        ))}
      </div>

      <div className="result" style={{ display: props.displayCocktailRecipie ? '' : 'none' }}>
        <hr />
        <h3>レシピ</h3>  
        {props.cocktailsRecipes.map((recipe, key) => (
            <span key={key}>
              { recipe['name'] }: {recipe['amount']}
              <br />
            </span>
          ))}
        <hr />
        <h3>材料を買う</h3> 
        {props.cocktailIngredients.map((ingredient, key) => (
            <span key={ key }>
              <a href={ ingredient['url'] }>
               <img src={ ingredient['image'] } alt="おすすめ結果" />
              <br />
              { ingredient['name'] }
              <br />
                Amazonで購入
              </a>
              <br />
            </span>
          ))}
      </div>

      <div style={{ display: props.searchByLocation ? '' : 'none' }}>
       {/* <p>位置情報から探す</p> */}
          {!props.isFirstRef && !props.isAvailable && <p className="App-error-text">geolocation IS NOT available</p>}
          {props.isAvailable && (
            <div>
              <button onClick={() => getCurrentPosition()}>位置情報から探す</button>
              { isSearching ? <ReactLoading type="spin" /> : <span /> }
            </div>
          )}
      </div>

      <div style={{ display: props.searchByStation ? '' : 'none' }}>
        <label>都道府県:</label>
        <select onChange={event => setPrefecture(event.target.value)}>
            {Prefectures.OPTIONS.map((option, key) => {
            return (<option value={option} key={key} >{option}</option>)
            })}
        </select>
        <br />
        <label>駅名:</label>
        <input
            type="text"
            value={station}
            onChange={event => setStation(event.target.value)}
        />
        <button onClick={() => searchRestaurant()}>検索</button>
      </div>
        {console.log('responseData!!!!!')}
        {console.log(responseData.length)}
        { 
          responseData.length ? shopInfo() : <div></div>
        }
     </div>
   </div>
  );
};

export default MessageWindow;
