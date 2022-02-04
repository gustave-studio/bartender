import React, {useState} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('今日は、どういったお酒を飲まれますか？')
  const [whisky, setWhisky] = useState(false)
  const [choices, setChoices] = useState(['ウィスキー', 'ビール'])

  const selectMenu = (drink: string, key: number) => {
    if ('私の好みに合わせてオススメを教えて'  === choices[key]) {
      setWhisky(true)
      setMessage('燻製のようなスモーキーな香りがあっても大丈夫でしょうか？')
      setChoices(['大丈夫', '苦手かな'])
    }

    if ('ウィスキー' === choices[key]) {
      console.log('whisky')
      setWhisky(true)
      setMessage('どんなウィスキーにしますか？')
      setChoices(['好きな味を言うから、オススメ教えて', 'ウィスキーのジャンルで選びたいな'])
    }
  }

  return (
    <div className="App">
      <h2>バーテンダー:「{message}」</h2>
      {choices.map((choice, key) => (
        <div>
          {console.log(key)}
          <button key={key} onClick={() => selectMenu(choice, key)}>{choice}</button>
        </div>
      ))}
    </div>
  );
}

export default App;
