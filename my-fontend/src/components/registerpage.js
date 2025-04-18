'use client';
import React, { useState } from 'react';
import {
  Box, Paper, Grid, Typography, Button, Divider, TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      return setError('Vui lòng nhập đầy đủ thông tin.');
    }

    if (password !== confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp.');
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          emailAddress: email, // Sử dụng email từ form.email
          password,
          phoneNumber: '0000000000', // Có thể cho người dùng nhập hoặc mặc định
          roleId: 'user', // Mặc định là user
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || 'Đăng ký thất bại');
      }

      alert('Đăng ký thành công!');
      router.push('/account'); // Điều hướng sang trang đăng nhập
    } catch (err) {
      setError('Lỗi khi gửi yêu cầu đăng ký');
    }
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Paper elevation={6} sx={{ width: 400, padding: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
          Đăng ký
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2} direction='column'>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              name='name'
              label='Họ và tên'
              variant='outlined'
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              name='email'
              label='Email'
              variant='outlined'
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              name='password'
              label='Mật khẩu'
              type='password'
              variant='outlined'
              fullWidth
              value={form.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              type='password'
              variant='outlined'
              fullWidth
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          {error && (
            <Grid sx={{ gridColumn: 'span 12' }}>
              <Typography color='error'>{error}</Typography>
            </Grid>
          )}
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Button variant='contained' color='primary' fullWidth onClick={handleRegister}>
              Đăng ký
            </Button>
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Typography variant='body2' color='primary'>
              Đã có tài khoản?
            </Typography>
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Button variant='outlined' color='secondary' fullWidth onClick={() => router.push('/account')}>
              Đăng nhập
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
