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
      <div className="top_explanatory_text">
        <h2>
          イエノミ×バーテンダーとは？
        </h2>
        <div>
          サイトの説明<br />
          サイトの説明<br />
          サイトの説明<br />
        </div>
        <h2>
          イエノミ×バーテンダーで出来ること
        </h2>
        <div>
          機能の説明<br />
          機能の説明<br />
          機能の説明<br />
        </div>
      </div>
    </>
  );
};

export default Top;
