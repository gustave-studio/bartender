import React, {useState, useEffect} from 'react';
import { ReactHTMLElement } from 'react';
import Prefectures from '../prefectures.js';
import Genre from '../genre.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import ReactLoading from 'react-loading';
import ReturnToStart from './ReturnToStart'
import ShareButton from './ShareButton'
import CheckBox from './CheckBox'

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
    const [genre, setGenre] = useState("G002");
    const [station, setStation] = useState("札幌");
    const [isSearching, setIsSearching] = useState(false);
    const [freeDrinkFlag, setFreeDrinkFlag] = useState(false);
    const checkLists = [
      { id: 1, label: "飲み放題あり", checked: freeDrinkFlag }
    ]
    //checkedItemsは初期値を空のオブジェクトにする
    // const [checkedItems, setCheckedItems] = useState<Array<CheckStateType>>([])
    const [checked, setChecked] = useState(false);

    const handleChange = (id: number, checked: boolean) => {
      //checkedItemsのstateをセット
      switch (id) {
        case 1:
          setFreeDrinkFlag(checked);
          break;
      } 
      // console.log('checkedItems:', checkedItems)
    }


    const displayMore = () => {
        if (loadIndex > responseData.length) {
          setIsEmpty(true);
        } else {
          setLoadIndex(loadIndex + 5);
        }
      };

      const fetchHotpepperAPI = async (x: string, y: string) => {
        const api_key = process.env.REACT_APP_HOTPEPPER_API_KEY
        console.log('---url!!!!!')
        console.log(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${api_key}&lat=${y}&lng=${x}&range=3&order=4&count=100&format=jsonp&free_drink=${freeDrinkFlag ? 1 : 0}&genre=${genre}`)
        await axios.get(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${api_key}&lat=${y}&lng=${x}&range=3&order=4&count=100&format=jsonp&free_drink=${freeDrinkFlag ? 1 : 0}&genre=${genre}`, {
          adapter: jsonpAdapter
        })
        .then((response: any) => {
          console.log('ホットペッパー取得');
          setResponseData(response.data.results.shop)
          if (response.data.results.results_available === 0) {
            props.setMessage('条件に一致するお店はありませんね。違う条件でもう一度探しましょうか。')
          }
          setIsSearching(false)
        })
      }
    
    const searchRestaurant = async () => {
      await axios.get(`https://express.heartrails.com/api/json?method=getStations&name=${station}&prefecture=${prefecture}&free_drink=${freeDrinkFlag}&genre=${genre}`)
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
          fetchHotpepperAPI(String(longitude), String(latitude))
          clearTimeout(timer)
        });
      };

      const shopInfo = () => {
        props.setMessage('この辺のお店はもう行きました？')
        props.setResultOfSearches(true)

        return (
          <>
          <div style={{ display: props.resultOfSearches ? '' : 'none' }}>
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
            <br />
            <ShareButton />
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
        <br />
        <ShareButton />
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
      <br />
      <label>お店の種類:</label>
      <select onChange={event => setGenre(event.target.value)}>
        {Genre.OPTIONS.map((genre, key) => {
          return (<option value={genre.code} key={key} >{genre.name}</option>)
        })}
      </select>
      <br />
      <form>
        <label>お店の条件:</label>
        {checkLists.map((item, index: number) => {
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={item.id}
                value={item.label}
                handleChange={handleChange}
                checked={item.checked}
              />
              {item.label}
            </label>
          )
        })}
      </form>
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
        <br />
        <label>お店の種類:</label>
        <select onChange={event => setGenre(event.target.value)}>
        {Genre.OPTIONS.map((genre, key) => {
          return (<option value={genre.code} key={key} >{genre.name}</option>)
        })}
        </select>
        <br />
        <form>
          <label>お店の条件:</label>
          {checkLists.map((item, index: number) => {
            return (
              <label htmlFor={`id_${index}`} key={`key_${index}`}>
                <CheckBox
                  id={item.id}
                  value={item.label}
                  handleChange={handleChange}
                  checked={item.checked}
                />
                {item.label}
              </label>
            )
          })}
        </form>
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
