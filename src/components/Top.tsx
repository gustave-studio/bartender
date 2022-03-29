import React from 'react';
import StartButton from './StartButton';

type TopPropsType = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  // talking(): void;
}

const Top = function (props: TopPropsType) {
  const { setIsStarted, setPlaying } = props;
  const start = () => {
    setIsStarted(true);
    setPlaying(true);
    // props.talking()
  };

  return (
    <>
      <div className="top_screen">
        <StartButton start={start} />
      </div>
      <div className="top_explanatory_container">
        <div className="top_explanatory_label_container">
          <h2>
            イエノミ×バーテンダーとは？
          </h2>
        </div>
        <div className="top_explanatory_text">
          架空のバーテンダーにおすすめのお酒を診断してもらうサイトです。
          <br />
          家に居ながら素敵なお酒に出会うことが出来ます。
          <br />
        </div>
        <br />
        <br />
        <div className="top_explanatory_label_container">
          <h2>
            使い方
          </h2>
        </div>
        <div className="top_explanatory_text">
          <div className="center_image">
            <img src="explanatory_image.png" alt="diagnose" />
          </div>
          <h3>- ① 自分に合ったお酒を探したい -</h3>
          バーテンダーに「自分に合ったお酒を探したい」と伝えると、いくつか質問されます。
          <br />
          質問に答えて自分に合ったお酒を診断してもらいましょう！
          <br />
          <br />
          <h3>- ② 家飲み用のおつまみが知りたい -</h3>
          ①と同様にバーテンダーに「家飲み用のおつまみが知りたい」と伝えると、いくつか質問されます。
          <br />
          家飲みにピッタリなおつまみを見つけましょう！
          <br />
          <br />
          <h3>- ③ 近くにいいお店がないか探したい -</h3>
          バーテンダーに「近くにいいお店がないか探したい」と伝えると、現在の位置情報、または、駅名から飲食店を探すことが出来ます。
          <br />
          バーテンダーは近所の飲食店に詳しいので、きっといいお店が見つかりますよ！
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Top;
