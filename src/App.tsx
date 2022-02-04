import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('どういったお酒にしましょうか？')
  const [displayMessage, setDisplayMessage] = useState('')
  const [displayChoices, setDisplayChoices] = useState(false)
  const [whisky, setWhisky] = useState(false)
  const [choices, setChoices] = useState(['ウィスキー', 'ビール'])

  const selectMenu = (drink: string, key: number) => {
    if ('私の好みに合わせてオススメを教えて'  === choices[key]) {
      setWhisky(true)
      setMessage('燻製のようなスモーキーな香りがあっても大丈夫でしょうか？')
      setChoices(['大丈夫', '苦手かな'])
      setDisplayChoices(false)
    }

    if ('ウィスキー' === choices[key]) {
      console.log('whisky')
      setWhisky(true)
      setMessage('どんなウィスキーにしますか？')
      setChoices(['好きな味を言うから、オススメ教えて', 'ウィスキーのジャンルで選びたいな'])
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
      await sleep(50);
    }
    await sleep(100);
    setDisplayChoices(true)
  }

  useEffect(() => {
    setInteger()
  }, [message]);

  return (
    <div className="App">
      バーテンダー: {displayMessage}
    <section id="bartender">
    </section>
    {choices.map((choice, key) => (
          <span key={key} style={{ display: displayChoices ? '' : 'none' }}>
            <button key={key} onClick={() => selectMenu(choice, key)}>{choice}</button>
            <br />
          </span>
        ))}
    </div>
  );
}

export default App;
