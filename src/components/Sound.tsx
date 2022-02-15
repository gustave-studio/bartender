import React, { useState }  from 'react';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import ReactHowler from 'react-howler'

type SoundPropsType = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sound = function (props: SoundPropsType) {
  return (
    <div className="header">
      BGM : Gunshot Straight
        <br />
        Artist : MusMus
        <br />
        Sound
        <br />
        { props.playing
          ?<PauseCircleOutlineIcon
            onClick={() => props.setPlaying((state) => !state)}/>
          :<PlayCircleOutlineIcon
            onClick={() => props.setPlaying((state) => !state)}/>
        }
        <ReactHowler
          src={`${process.env.REACT_APP_SOUND_FILE}`}
          playing={props.playing}
        />
    </div>
  );
};

export default Sound;
