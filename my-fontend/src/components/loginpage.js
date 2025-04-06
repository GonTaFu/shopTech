import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Link from 'next/link'

export default function LoginPage() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Paper elevation={6} sx={{ width: 400, padding: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
          Đăng nhập
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <TextField label='Email' variant='outlined' fullWidth />
          </Grid>
          <Grid item>
            <TextField label='Mật khẩu' type='password' variant='outlined' fullWidth />
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary' fullWidth>
              Đăng nhập
            </Button>
          </Grid>
          <Grid item>
              <Button variant='outlined' color='secondary' fullWidth>
                Đăng ký
              </Button>
          </Grid>
          <Grid item>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', textAlign: 'middle' }}>
              Quên mật khẩu?
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' fullWidth>
              Đăng nhập với Google
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' fullWidth>
              Đăng nhập với Facebook
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
