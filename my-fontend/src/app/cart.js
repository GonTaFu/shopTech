"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const cartItems = [
  { id: 1, name: 'Sản phẩm A', price: 200000, image: '1.png', quantity: 1 },
  { id: 2, name: 'Sản phẩm B', price: 150000, image: '2.png', quantity: 2 }
]

const Cart = () => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <Box sx={{ flexGrow: 1, p: 3, maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        Giỏ Hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {cartItems.map((item) => (
            <Paper key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 2, boxShadow: 3 }}>
              <img src={item.image} width="100" alt={item.name} style={{ borderRadius: 8, marginRight: 16 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                <Typography sx={{ color: 'gray' }}>Giá: {item.price.toLocaleString()} VND</Typography>
                <Typography>Số lượng: {item.quantity}</Typography>
              </Box>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Tóm tắt đơn hàng</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ fontSize: 18 }}>Tổng tiền: <b>{totalAmount.toLocaleString()} VND</b></Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontSize: 16, fontWeight: 'bold' }}>
              Thanh toán
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Cart