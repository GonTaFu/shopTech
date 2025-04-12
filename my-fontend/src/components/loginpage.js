  'use client';

  import React, { useState } from 'react';
  import {
    Box, Paper, Grid, Typography, Button, Divider, TextField
  } from '@mui/material';
  import { useRouter } from 'next/navigation';

  export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/accounts/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailAddress: email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Đăng nhập thất bại');
          return;
        }

        localStorage.setItem('token', data.token);

        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/Home');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi đăng nhập');
      }
    };

    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <Paper elevation={6} sx={{ width: 400, padding: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>Đăng nhập</Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2} direction='column'>
            <Grid item>
              <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            </Grid>
            <Grid item>
              <TextField label='Mật khẩu' type='password' value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
            </Grid>
            {error && (
              <Grid item>
                <Typography color='error'>{error}</Typography>
              </Grid>
            )}
            <Grid item>
              <Button variant='contained' color='primary' fullWidth onClick={handleLogin}>
                Đăng nhập
              </Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' color='secondary' fullWidth onClick={() => router.push('/account/register')}>
                  Đăng ký
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
