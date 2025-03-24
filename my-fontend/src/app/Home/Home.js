// src/pages/Home.js
'use client'

import React from "react";
import { Grid, Typography, Box, Button, Card, CardMedia, CardContent, Container, Paper } from '@mui/material';
import { styled } from '@mui/system'; 

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export default function Home() {
  const products = [
    { id: 1, name: "Laptop ASUS VivoBook", price: "12.990.000đ", image: "https://via.placeholder.com/200?text=Laptop+ASUS" },
    { id: 2, name: "PC MSI Gaming", price: "18.490.000đ", image: "https://via.placeholder.com/200?text=PC+MSI" },
    { id: 3, name: "Monitor Dell 27'", price: "6.990.000đ", image: "https://via.placeholder.com/200?text=Monitor+Dell" },
  ];

  const brands = ["ASUS", "MSI", "Acer", "Dell", "Lenovo", "HP", "Gigabyte", "Intel", "AMD", "NVIDIA"];

  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        THÁNG 3 CỘNG NỢI - THÁNG ĐỔI 1️⃣0️⃣
      </Typography>
      <Typography align="center" color="textSecondary" paragraph>
        Nhập CODE: WINNER để được giảm thêm 5% tối đa 200K (Áp dụng từ 01/03 - 14/03/2025)
      </Typography>

      {/* Thương hiệu nổi bật */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Thương Hiệu Nổi Bật
        </Typography>
        <Grid container spacing={2}>
          {brands.map((brand) => (
            <Grid item xs={6} sm={4} md={3} key={brand}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <img src={`https://via.placeholder.com/80?text=${brand}`} alt={brand} loading="lazy" />
                <Typography variant="subtitle1" mt={1}>
                  {brand}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Danh sách sản phẩm */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Danh Sách Sản Phẩm
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá: {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng!`)}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledContainer>
  );
}
