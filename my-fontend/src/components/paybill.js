"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  Typography,
  Autocomplete,
  Container,
} from "@mui/material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import payment from "./payment";
import { useRouter } from "next/navigation";

import { getCart, clearCart } from "../utils/cart";
import API from "../utils/api";
import Cookies from "js-cookie";

const PayPage = () => {
  const router = useRouter();

  const baseOrder = {
    name: "",
    accountId: "",
    status: "Pending",
    phoneNumber: "",
    address: "",
    payment: "",
    order_detail: [],
  };

  const [formData, setFormData] = useState(baseOrder);

  const fetch = async () => {
    try {
      const id = Cookies.get("userID");
      const name = Cookies.get("userName");
      if (!id && !name) {
        router.push('/account');
        return;
      }

      const cart = getCart();
      const res = await Promise.all(
        cart.map((item) => API.get(`/products/${item.productId}`))
      );
      const fullProducts = res.map((res, index) => ({
        id: res.data._id,
        quantity: cart[index].quantity,
      }));
      setFormData((prev) => ({
        ...formData,
        order_detail: fullProducts,
        accountId: id,
      }));
    } catch (err) {
      setFormData(baseOrder);
      console.log("Lỗi hệ thống");
    }
  };

  const handleChange = async (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData((prev) => newData);
  };

  const handleCheckOut = async () => {
    try {
      const res = await API.post(`/orders`, formData);

      if (res.status === 200 || res.status === 201) {
        clearCart();
        setFormData(baseOrder);
        router.push("/cart");
      }
      else {
        console.log("Thanh toán thất bại");
      }

    } catch (err) {
      setFormData(baseOrder);
      console.log("Lỗi hệ thống");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
    {console.log(formData)}
      {(formData.order_detail.length > 0 && (
        <>
          <Container maxWidth="md" sx={{ mt: 5 }}>
            {/* {console.log(formData)} */}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
            >
              Thanh Toán
            </Typography>
            <Grid container spacing={3}>
              {/* Form Nhập Thông Tin */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Nhập thông tin thẻ
                  </Typography>
                  <Grid container spacing={2}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      variant="outlined"
                      name="name"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      variant="outlined"
                      name="phoneNumber"
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      variant="outlined"
                      name="address"
                      onChange={handleChange}
                    />
                  </Grid>
                </Paper>
              </Grid>

              {/* Form Nhập Số Thẻ */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Nhập số thẻ và mã Pin
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Số thẻ" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Mã Pin" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        disablePortal
                        options={payment}
                        value={payment.find(p => p.value === formData.payment) || null}
                        onChange={(event, value) => {
                          setFormData((prev) => ({ ...prev, payment: value?.value || "" }));
                        }}
                        sx={{ width: 200 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Thanh toán bằng" />
                        )}
                      />
                    </Grid>
                  </Grid>

                  {/* Nút Thanh Toán & Hủy */}
                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      startDecorator={<PaymentIcon />}
                      onClick={handleCheckOut}
                    >
                      Thanh Toán
                    </Button>
                    <Button
                      component="a"
                      href="/cart"
                      startDecorator={<CancelIcon />}
                      sx={{ backgroundColor: "red", color: "white" }}
                    >
                      Hủy
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      )) || (
        <Container maxWidth="md" sx={{ mt: 5, marginBottom: "100%" }}>
          <Typography variant="h1" gutterBottom>
            <center> Checkout </center>
          </Typography>
          <Typography variant="h3" gutterBottom>
            <center> - Chưa có sản phẩm -</center>
          </Typography>
        </Container>
      )}
    </>
  );
};

export default PayPage;
