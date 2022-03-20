import React from 'react';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ReactHowler from 'react-howler';

type SoundPropsType = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sound = function (props: SoundPropsType) {
  const { playing, setPlaying } = props;
  return (
    <div className="header">
      BGM : Gunshot Straight&nbsp;&nbsp;&nbsp;
      Artist : MusMus
      <div className="sound_button">
        { playing
          ? (
            <PauseCircleOutlineIcon
              onClick={() => setPlaying((state) => !state)}
            />
          )
          : (
            <PlayCircleOutlineIcon
              onClick={() => setPlaying((state) => !state)}
            />
          )}
        <ReactHowler
          src={`${process.env.REACT_APP_SOUND_FILE}`}
          playing={playing}
        />
      </div>
    </div>
  );
};

export default Sound;
