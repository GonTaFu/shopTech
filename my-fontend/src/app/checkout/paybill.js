"use client";
import React from "react";
import { Paper, TextField, Grid, Typography, Autocomplete, Container } from "@mui/material";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import payment from "./payment";

const PayPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
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
              <Grid item xs={12}>
                <TextField fullWidth label="Họ và tên" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Số điện thoại" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Địa chỉ" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="PostCode" variant="outlined" type="number" />
              </Grid>
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
                  sx={{ width: 200 }}
                  renderInput={(params) => <TextField {...params} label="Thanh toán bằng" />}
                />
              </Grid>
            </Grid>

            {/* Nút Thanh Toán & Hủy */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button startDecorator={<PaymentIcon />}>Thanh Toán</Button>
              <Button startDecorator={<CancelIcon />} sx={{ backgroundColor: "red", color: "white" }}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PayPage;
