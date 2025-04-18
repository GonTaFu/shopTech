"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailAddress: email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đăng nhập thất bại");
        return;
      }

      Cookies.set("token", data.token, { expires: 1 / 24 }); // Cookie tồn tại 1 giờ
      Cookies.set("userName", data.fullName, { expires: 1 / 24 });
      Cookies.set("userID", data.id, { expires: 1 / 24 });
      Cookies.set("role", data.role, { expires: 1 / 24 });

      // Phát sự kiện để lắng nghe và cập nhật
      window.dispatchEvent(new Event("user-login"));
      
      if (data.role == "admin") {
        router.push("/admin");
        return;
      }
      router.push("/");
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={6}
        sx={{ width: 400, padding: 4, borderRadius: 3, textAlign: "center" }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Đăng nhập
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2} direction="column">
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          {error && (
            <Grid sx={{ gridColumn: 'span 12' }}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => router.push("/account/register")}
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
