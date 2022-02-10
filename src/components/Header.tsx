import React, { useState }  from 'react';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import ReactHowler from 'react-howler'

const Header = function () {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="header">
      <h1>VR Bar</h1>
        BGM : Gunshot Straight
        <br />
        Artist : MusMus
        <br />
        Sound
        <br />
        {playing
          ?<PauseCircleOutlineIcon
            onClick={() => setPlaying((state) => !state)}/>
          :<PlayCircleOutlineIcon
            onClick={() => setPlaying((state) => !state)}/>
        }
        <ReactHowler
          src={`${process.env.REACT_APP_SOUND_FILE}`}
          playing={playing}
        />
        </div>
  );
};

export default Header;
