import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('どういったお酒にしましょうか？')
  const [displayMessage, setDisplayMessage] = useState('')
  const [displayChoices, setDisplayChoices] = useState(false)
  const [whisky, setWhisky] = useState(false)
  const [choices, setChoices] = useState(['ウィスキー', 'ビール'])

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
      // setChoices(['シンプルでスッキリしたウィスキー', 'マイルドで飲みやすいウィスキー', '華やかな香りのウィスキー'])
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

  return (
    <div className="App">
      <div className="container">
        <div className="main_screen">
        </div>
        <div className="message_window">
          <div className="message">
            バーテンダー:
            { displayMessage.split('\n').map((item) => (
                <div key={item}>
                  {item}
                </div>
              )) }
            {choices.map((choice, key) => (
              <span key={key} style={{ display: displayChoices ? '' : 'none' }}>
                <button key={key} onClick={() => selectMenu(choice, key)}>{choice}</button>
                <br />
              </span>
            ))}
           </div>
         </div>
       </div>
    </div>
  );
}

export default App;
