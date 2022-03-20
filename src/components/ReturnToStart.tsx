import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';

type ShopData = {
  logo_image: string
  urls_pc: string
  shop_name: string
}

type ReturnToStartProps = {
  resetState(): void;
  setResponseData: React.Dispatch<React.SetStateAction<Array<ShopData>>>;
}

function ReturnToStart(props: ReturnToStartProps) {
  const { resetState, setResponseData } = props;

  return (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <div>
          <Stack spacing={2} direction="row">
            <Grid item container direction="column" spacing={0}>
              <Button
                // style={{ backgroundColor: '#ff1493', color: '#FFFFFF', fontSize: '30px' }}
                onClick={() => {
                  resetState();
                  setResponseData([]);
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
  );
}

export default ReturnToStart;
