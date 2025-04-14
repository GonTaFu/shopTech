"use client";
// src/components/ProductDetail.js
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
} from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Grid from "@mui/material/Grid";
import Link from "next/link";

import { addToCart } from "../utils/cart";

const TableProductDetail = ({ product }) => {
  const displayData = {
    ID: product._id,
    Name: product.name,
    Price: product.price,
    Brand: product.brand?.name || "",
    Category: product.category?.name || "",
    Quantity: product.quantity,
    Warranty: `${product.warranty} Tháng`,
  };
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {Object.entries(displayData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
              <TableCell>
                {typeof value === "object" ? JSON.stringify(value) : value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductDetail = ({ product }) => {
  const data_table = { ...product };

  const notify = () => {
    return toast.success("Đã thêm sản phẩm vào giỏ hàng", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleAddToCart = () => {
    addToCart(product._id, 1);
    notify();
  };

  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="md">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <CssBaseline />
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 1, sm: 4, md: 8 }}
          >
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={product.images[0]}
                  title={product.name}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                  Mã sản phẩm: {product._id}
                </Typography>
                {/* <Rating name="read-only" value={product.rate} readOnly /> */}
                <Typography gutterBottom variant="h8" component="div">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Typography>
                <Typography variant="h8" component="div">
                  Thương hiệu: {product.brand.name}
                </Typography>
                <Typography variant="h8" component="div">
                  Loại sản phẩm: {product.category.name}
                </Typography>
                {/* <Typography variant="h8" component="div">
                  Status: {product.status}
                </Typography> */}
                <Typography variant="h8" component="div">
                  Bảo hành: {product.warranty} Tháng
                </Typography>
              </CardContent>
              <CardActions bgcolor="text.disabled">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Buy Now
                </Button>
              </CardActions>
              <CardActions bgcolor="text.disabled">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<FavoriteBorderIcon />}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 4, md: 8 }}
        >
          <Grid size={{ xs: 6, md: 5 }}>
            <Typography gutterBottom variant="h5" component="div">
              Mô tả sản phẩm
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {product.description}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography gutterBottom variant="h5" component="div">
              Thông tin chi tiết
            </Typography>
            <TableProductDetail product={data_table}></TableProductDetail>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetail;
