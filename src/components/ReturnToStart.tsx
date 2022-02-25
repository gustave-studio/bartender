import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';

type ReturnToStartProps = {
  resetState(): void;
  setResponseData: React.Dispatch<React.SetStateAction<Array<never>>>;
}

const ReturnToStart = function (props: ReturnToStartProps) {
  return (
    <>
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <div>
          <Stack spacing={2} direction="row">
            <Grid item container direction="column" spacing={0}>
              <Button
                // style={{ backgroundColor: '#ff1493', color: '#FFFFFF', fontSize: '30px' }}
                onClick={() => { 
                  props.resetState()
                  props.setResponseData([])
                }}
              >
                最初に戻る
              </Button>
            </Grid>
          </Stack>
        </div>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  </>
  );
};

export default ReturnToStart;
