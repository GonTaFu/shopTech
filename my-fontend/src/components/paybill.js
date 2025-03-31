"use client";
import React from "react";
import { Paper, TextField, Grid, Typography, Autocomplete, Container } from "@mui/material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import payment from "../components/payment";

const PayPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Paper bao ngoài để gom tất cả vào chung một khối */}
      <Paper elevation={4} sx={{ padding: 4, width: "100%", maxWidth: 700 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
          Thanh Toán
        </Typography>
        <Grid container spacing={2}>
          {/* Form Nhập Thông Tin */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Nhập thông tin thẻ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Họ và tên" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Số điện thoại" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="PostCode" variant="outlined" type="number" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Địa chỉ" variant="outlined" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Form Nhập Số Thẻ */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Nhập số thẻ và mã Pin
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Số thẻ" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Mã Pin" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    options={payment}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Thanh toán bằng" />}
                  />
                </Grid>
              </Grid>

              {/* Nút Thanh Toán & Hủy */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                <Button startDecorator={<PaymentIcon />} variant="solid">
                  Thanh Toán
                </Button>
                <Button startDecorator={<CancelIcon />} variant="solid" sx={{ backgroundColor: "red", color: "white" }}>
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PayPage;
