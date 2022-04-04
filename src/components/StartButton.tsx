import React from 'react';
import Button from '@mui/material/Button';

type StartPropsType = {
  start(): void;
}

function StartButton(props: StartPropsType) {
  const { start } = props;
  return (
    <>
      <div className="start_button">
        <Button variant="contained" style={{ backgroundColor: '#ff3695' }} onClick={() => start()}>
          はじめる
        </Button>
      </div>
      <div className="start_text">
        ＊BGMが再生されますので、音量にご注意下さい。
      </div>
    </>
  );
}

export default StartButton;
