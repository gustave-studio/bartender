import React, {useState} from 'react';
import { ReactHTMLElement } from 'react';
import Prefectures from '../prefectures.js';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';


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
}

const MessageWindow = function (props: MessageWindowPropsType) {
    const [responseData, setResponseData] = useState([]);
    const jsonpAdapter = require('axios-jsonp')
    const [loadIndex, setLoadIndex] = useState(5);
    const [isEmpty, setIsEmpty] = useState(false);
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [prefecture, setPrefecture] = useState("北海道");
    const [station, setStation] = useState("札幌");

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
    
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          console.log('-----')
          console.log(typeof(latitude))
          fetchHotpepperAPI(String(longitude), String(latitude))
        });
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

  return (
    <div className="message_window">
    <div className="message">
      バーテンダー： 
      <div className="result" style={{ display: props.result ? '' : 'none' }}>
        <a href={props.resultURL}>
          <img src={props.resultImage} alt="おすすめ結果" />
          <br />
          Amazonで購入
        </a>
      </div>
      
      { props.displayMessage.split('\n').map((item) => (
          <div key={item}>
            {item}
          </div>
        )) }
      <div className="choices">
        {props.choices.map((choice, key) => (
            <span key={key} style={{ display: props.displayChoices ? '' : 'none' }}>
            <button key={key} onClick={() => props.selectMenu(choice, key)}>・{choice}</button>
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
              <div>
                latitude: {position.latitude}
                <br />
                longitude: {position.longitude}
              </div>
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

      { console.log('----isFirstRef') }
      { console.log(typeof props.isFirstRef) }

      {
        responseData.length ?
        shopInfo() : <div></div>
      }
     </div>
   </div>
  );
};

export default MessageWindow;
