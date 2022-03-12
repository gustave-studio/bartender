import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';

type StartPropsType = {
  start(): void;
}

const StartButton = (props: StartPropsType) => (
  <>
    <div className="start_button">
      <Button onClick={() => props.start()}>
        はじめる
      </Button>
    </div>
    <div className="start_text">
    ＊BGMが再生されますので、音量にご注意下さい。
    </div>
  </>
);

export default StartButton;
