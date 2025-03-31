"use client";
import { Grid, Card, CardContent, Typography, CardMedia, Container } from "@mui/material";
import Image from "next/image";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));


const productlist = [
  { id: 1, name: "Sản phẩm 1", price: 100000, image: "/images/10.jpg" },
  { id: 2, name: "Sản phẩm 2", price: 200000, image: "/images/10.jpg" },
  { id: 3, name: "Sản phẩm 3", price: 300000, image: "/images/10.jpg" },
  { id: 4, name: "Sản phẩm 4", price: 400000, image: "/images/10.jpg" },
  { id: 5, name: "Sản phẩm 5", price: 500000, image: "/images/10.jpg" },
  { id: 6, name: "Sản phẩm 6", price: 600000, image: "/images/10.jpg" },
  { id: 7, name: "Sản phẩm 7", price: 700000, image: "/images/10.jpg" },
  { id: 8, name: "Sản phẩm 8", price: 800000, image: "/images/10.jpg" },
  { id: 9, name: "Sản phẩm 9", price: 900000, image: "/images/10.jpg" },
  { id: 10, name: "Sản phẩm 10", price: 1000000, image: "/images/10.jpg" },
  { id: 11, name: "Sản phẩm 11", price: 1000000, image: "/images/10.jpg" },

];

const productList = () => {
  return (
    <Container sx={{ mt: 5, px: { xs: 1, sm: 2, md: 3 }, width: "100%" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Danh Sách Sản Phẩm
      </Typography>
      <Grid container spacing={2}>
        {productlist.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia>
                <Image src={product.image} alt={product.name} width={250} height={200} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px", }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
                <Typography color="primary">{product.price.toLocaleString()} VND</Typography>

                <Stack spacing={2} direction="row">
                  <ColorButton variant="contained">Xem chi tiết</ColorButton>
                  <BootstrapButton variant="contained" disableRipple>Thêm vào giỏ hàng</BootstrapButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default productList;
