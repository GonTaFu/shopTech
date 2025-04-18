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
import { notifyError, NotifyContainer } from "../utils/notify";
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
  const [errorForm, setErrorForm] = useState({});

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Tên không được để trống";
    }

    if (!data.accountId.trim()) {
      errors.accountId = "Thiếu accountId";
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!data.address.trim()) {
      errors.address = "Địa chỉ không được để trống";
    }

    if (!data.payment.trim()) {
      errors.payment = "Vui lòng chọn phương thức thanh toán";
    }

    return errors;
  };

  const fetch = async () => {
    try {
      const id = Cookies.get("userID");
      const name = Cookies.get("userName");
      if (!id || !name) {
        router.push("/account");
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
      notifyError("Lỗi hệ thống");
    }
  };

  const handleChange = async (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData((prev) => newData);
  };

  const handleCheckOut = async () => {
    try {
      const errors = validateFormData(formData);
      if (Object.keys(errors).length > 0) {
        setErrorForm(errors);
        notifyError("Thanh toán thất bại");
        return;
      }
      const res = await API.post(`/orders`, formData);

      if (res.status === 200 || res.status === 201) {
        clearCart();
        setFormData(baseOrder);
        router.push("/cart");
      } else {
        notifyError("Thanh toán thất bại");
      }
    } catch (err) {
      setFormData(baseOrder);
      notifyError("Lỗi hệ thống");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {(formData.order_detail.length > 0 && (
        <>
          <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
            >
              Thanh Toán
            </Typography>
            <Grid container spacing={3}>
              {/* Form Nhập Thông Tin */}
              <Grid sx={{
                gridColumn: {
                  xs: 'span 12',
                  sm: 'span 6'
                },
              }}>
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
                      error={errorForm.name}
                      helperText={errorForm.name}
                    />
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      variant="outlined"
                      name="phoneNumber"
                      onChange={handleChange}
                      error={errorForm.phoneNumber}
                      helperText={errorForm.phoneNumber}
                    />
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      variant="outlined"
                      name="address"
                      onChange={handleChange}
                      error={errorForm.address}
                      helperText={errorForm.address}
                    />
                  </Grid>
                </Paper>
              </Grid>

              {/* Form Nhập Số Thẻ */}
              <Grid sx={{
                gridColumn: {
                  xs: 'span 6',
                  sm: 'span 4'
                },
              }}>
                <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Nhập số thẻ và mã Pin
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid sx={{
                      gridColumn: {
                        xs: 'span 12'
                      },
                    }}>
                      <TextField fullWidth label="Số thẻ" variant="outlined" />
                    </Grid>
                    <Grid sx={{
                      gridColumn: {
                        xs: 'span 6'
                      },
                    }}>
                      <TextField fullWidth label="Mã Pin" variant="outlined" />
                    </Grid>
                    <Grid sx={{
                      gridColumn: {
                        xs: 'span 6'
                      },
                    }}>
                      <Autocomplete
                        disablePortal
                        options={payment}
                        value={
                          payment.find((p) => p.value === formData.payment) ||
                          null
                        }
                        onChange={(event, value) => {
                          setFormData((prev) => ({
                            ...prev,
                            payment: value?.value || "",
                          }));
                        }}
                        sx={{ width: 200 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Thanh toán bằng"
                            error={errorForm.payment}
                            helperText={errorForm.payment}
                          />
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
      <NotifyContainer />
    </>
  );
};

export default PayPage;
