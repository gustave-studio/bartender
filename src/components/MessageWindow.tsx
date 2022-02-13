import Prefectures from '../prefectures.js';

type MessageWindowPropsType = {
  result: boolean;
  resultURL: string;
  resultImage: string;
  displayMessage: string;
  choices: Array<string>;
  displayChoices: boolean;
  selectMenu: any;
//   ここから
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  station: string;
  setStation: React.Dispatch<React.SetStateAction<string>>;
  searchRestaurant: any;
  responseData: Array<any>;
  shopInfo: any;
//   setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageWindow = function (props: MessageWindowPropsType) {
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
      {props.choices.map((choice, key) => (
        <span key={key} style={{ display: props.displayChoices ? '' : 'none' }}>
          <button key={key} onClick={() => props.selectMenu(choice, key)}>{choice}</button>
          <br />
        </span>
      ))}

      <label>都道府県:</label>
      <select onChange={event => props.setPrefecture(event.target.value)}>
        {Prefectures.OPTIONS.map((option, key) => {
          return (<option value={option} key={key} >{option}</option>)
        })}
      </select>
      <br />
      <label>駅名:</label>
      <input
        type="text"
        value={props.station}
        onChange={event => props.setStation(event.target.value)}
      />
      <button onClick={() => props.searchRestaurant()}>検索</button>

      {
        props.responseData.length ?
        props.shopInfo() : <p>'b'</p>
      }

        {/* <p>Geolocation API Sample</p>
          {!isFirstRef && !isAvailable && <p className="App-error-text">geolocation IS NOT available</p>}
          {isAvailable && (
            <div>
              <button onClick={getCurrentPosition}>Get Current Position</button>
              <div>
                latitude: {position.latitude}
                <br />
                longitude: {position.longitude}
              </div>
            </div>
          )} */}
     </div>
   </div>
  );
};

export default MessageWindow;
