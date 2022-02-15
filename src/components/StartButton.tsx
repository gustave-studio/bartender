import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';

type StartPropsType = {
  start(): void;
}

const StartButton = (props: StartPropsType) => (
  <>
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <div>
          <Stack spacing={2} direction="row">
            <Grid item container direction="column" spacing={0}>
              <Button
                style={{ backgroundColor: '#ff1493', color: '#FFFFFF', fontSize: '30px' }}
                onClick={() => props.start()}
              >
                START
              </Button>
            </Grid>
          </Stack>
        </div>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
);

export default StartButton;
