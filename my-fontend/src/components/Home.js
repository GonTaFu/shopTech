"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  borderRadius: "12px",
  backgroundColor: "#fff",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.5),
  background: "linear-gradient(90deg, #1976d2 30%, #42a5f5 90%)",
  color: "#fff",
  fontWeight: "bold",
  transition: "background 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(90deg, #1565c0 30%, #1976d2 90%)",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: "rgba(0, 0, 0, 0.1)",
  borderWidth: "1px",
  background: "linear-gradient(to right, transparent, #1976d2, transparent)",
  height: "2px",
  margin: theme.spacing(4, 0),
}));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Lỗi khi tải thương hiệu:", error);
      }
    };

    fetchProducts();
    fetchBrands();
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1a237e",
          letterSpacing: "1px",
          textTransform: "uppercase",
          background: "linear-gradient(to right, #1a237e, #1976d2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        THÁNG 3 CỘNG NỢI - THÁNG ĐỔI 10
      </Typography>
      <Typography
        align="center"
        sx={{
          fontStyle: "italic",
          color: "#424242",
          fontSize: "1.1rem",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "8px 16px",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        Nhập CODE: WINNER để được giảm thêm 5% tối đa 200K (Áp dụng từ 01/03 -
        14/03/2025)
      </Typography>

      <StyledDivider />

      {/* Thương hiệu nổi bật */}
      <Box mt={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "600",
            color: "#1a237e",
            borderLeft: "4px solid #1976d2",
            paddingLeft: "12px",
          }}
        >
          Thương Hiệu Nổi Bật
        </Typography>
        <Grid container spacing={2}>
          {brands.map((brand, index) => (
            <Grid item xs={6} sm={4} md={2} key={brand._id || brand.name || index}>
              <StyledPaper elevation={3}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "500",
                    color: "#333",
                    fontSize: "1rem",
                  }}
                >
                  {brand.name || brand}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <StyledDivider />

      {/* Danh sách sản phẩm */}
      <Box mt={6}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "600",
            color: "#1a237e",
            borderLeft: "4px solid #1976d2",
            paddingLeft: "12px",
          }}
        >
          Danh Sách Sản Phẩm
        </Typography>
        {/* <Grid container spacing={4}>
          {products.slice(0, 4).map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      color: "#1a237e",
                      fontSize: "1.2rem",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Giá: {product.price}
                  </Typography>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() =>
                      alert(`Đã thêm ${product.name} vào giỏ hàng!`)
                    }
                  >
                    Thêm vào giỏ hàng
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid> */}
        <Grid container spacing={4}>
          {products.slice(0, 4).map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md:4 }} key={product._id}>
              <StyledCard>
                {/* <CardMedia
                  component="img"
                  height="160"
                  image={product.image} // Đảm bảo product.image chứa đường dẫn URL của ảnh
                  alt={product.name}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                /> */}
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.images?.[0]}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      color: "#1a237e",
                      fontSize: "1.2rem",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    Giá: {product.price}
                  </Typography>
                  <StyledButton
                    href={`/products/${product._id}`}
                  >
                    Xem chi tiết
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledContainer>
  );
}
