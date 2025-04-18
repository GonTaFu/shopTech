"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { getCart, removeFromCart } from "../utils/cart";
import API from "../utils/api";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const loadCart = async () => {
    const cart = getCart();
    const res = await Promise.all(
      cart.map((item) => API.get(`/products/${item.productId}`))
    );

    res.map((r) => {
      delete r.data.quantity;
      delete r.data.__v;
      delete r.data.show;
    });

    const fullProducts = res.map((res, index) => ({
      ...res.data,
      quantity: cart[index].quantity,
    }));

    console.log(fullProducts);
    setProducts(prev => fullProducts);
  };

  const handleDelete = async (id = null) => {
    if (id == null || id == undefined) return;
    removeFromCart(id);
    loadCart();
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (products.length <= 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "100%"
        }}
      >
        <Box sx={{ flexGrow: 1, p: 3, maxWidth: 900, margin: "auto" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
          >
            Giỏ Hàng
          </Typography>
          <Grid container spacing={3}>
            <Grid sx={{ gridColumn: 'span 4' }}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  <center>Đơn hàng</center>
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ fontSize: 18 }}>
                  Tổng tiền: <b>0 VND</b>
                </Typography>
                <Box component="section"
                sx={{ mt: 3, py: 1.5, fontSize: 16, fontWeight: "bold", p: 2, border: '1px dashed grey'}}
                >
                  <Typography variant="h5"><center>Giỏ hàng hiện trống</center></Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
          marginBottom: "100%"
      }}
    >
      <Box sx={{ flexGrow: 1, p: 3, maxWidth: 900, margin: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          Giỏ Hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid sx={{ gridColumn: 'span 8' }}>
            {products.map((item) => (
              <Paper
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <img
                  src={item.images[0]}
                  width="100"
                  alt={item.name}
                  style={{ borderRadius: 8, marginRight: 16 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ color: "gray" }}>
                    Giá: {item.price.toLocaleString()} VND
                  </Typography>
                  <Typography>Số lượng: {item.quantity}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                  sx={{ mt: 2, py: 1.5, fontWeight: "bold", margin: 2}}
                >
                  Xóa
                </Button>
              </Paper>
            ))}
          </Grid>
          <Grid sx={{ gridColumn: 'span 4' }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              <center>Đơn hàng</center>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Tổng tiền: <b>{totalAmount.toLocaleString()} VND</b>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                href="/checkout"
                sx={{ mt: 3, py: 1.5, fontSize: 16, fontWeight: "bold" }}
              >
                Thanh toán
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Cart;
