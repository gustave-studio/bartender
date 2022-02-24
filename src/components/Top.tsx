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
    </>
  );
};

export default Top;
