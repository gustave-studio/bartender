import StartButton from './StartButton'

type TopPropsType = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setInteger(): void;
}

const Top = function (props: TopPropsType) {
  const start = () => {
    props.setIsStarted(true)
    props.setPlaying(true)
    props.setInteger()
  }

  return (
    <>
      <div className="top_screen">
        <StartButton start={start}/>
      </div>
      <div className="top_explanatory_container">
        <h2>
          イエノミ×バーテンダーとは？
        </h2>
        <div className="top_explanatory_text">
          架空のバーテンダーにおすすめのお酒を診断してもらうサイトです。
          <br />
          家に居ながら素敵なお酒に出会うことが出来ます。
          <br />
        </div>
        <h2>
          イエノミ×バーテンダーで出来ること
        </h2>
        <div className="top_explanatory_text">
          <h3>- おすすめのお酒診断 -</h3>
          バーテンダーに「自分に合ったお酒を探したい」と伝えると、いくつか質問されます。
          <br />
          質問に答えて自分に合ったお酒を診断してもらいましょう！
          <br />
          <br />
          <div className="center_image">
            <img src="diagnose.png" alt="diagnose"/>
          </div>

          <h3>- 近くにあるお店を探す -</h3>
          バーテンダーに「近くにいいお店がないか探したい」と伝えると、現在の位置情報、または、駅名から飲食店を探すことが出来ます。
          <br />
          バーテンダーは近所の飲食店に詳しいので、きっといいお店が見つかりますよ！
          <br />
          <br />
          <div className="center_image">
            <img src="search_bar.png" alt="diagnose"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
