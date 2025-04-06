"use client";

import React from "react";
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
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle gradient background
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Soft shadow for depth
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  borderRadius: "12px", // Rounded corners
  backgroundColor: "#fff",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column", // Stack logo and text vertically
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  background: "linear-gradient(145deg, #ffffff, #e6e6e6)", // Subtle gradient for brand cards
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
  background: "linear-gradient(90deg, #1976d2 30%, #42a5f5 90%)", // Gradient button
  color: "#fff",
  fontWeight: "bold",
  transition: "background 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(90deg, #1565c0 30%, #1976d2 90%)", // Darker gradient on hover
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: "rgba(0, 0, 0, 0.1)",
  borderWidth: "1px",
  background: "linear-gradient(to right, transparent, #1976d2, transparent)", // Gradient divider
  height: "2px",
  margin: theme.spacing(4, 0),
}));

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Laptop ASUS VivoBook",
      price: "12.990.000đ",
      image: "https://via.placeholder.com/200?text=Laptop+ASUS",
    },
    {
      id: 2,
      name: "PC MSI Gaming",
      price: "18.490.000đ",
      image: "https://via.placeholder.com/200?text=PC+MSI",
    },
    {
      id: 3,
      name: "Monitor Dell 27'",
      price: "6.990.000đ",
      image: "https://via.placeholder.com/200?text=Monitor+Dell",
    },
  ];

  const brands = [
    "ASUS",
    "MSI",
    "Acer",
    "Dell",
    "Lenovo",
    "HP",
    "Gigabyte",
    "Intel",
    "AMD",
    "NVIDIA",
  ];

  return (
    <StyledContainer maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1a237e", // Deep indigo color for heading
          letterSpacing: "1px",
          textTransform: "uppercase",
          background: "linear-gradient(to right, #1a237e, #1976d2)", // Gradient text
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        THÁNG 3 CỘNG NỢI - THÁNG ĐỔI 1️⃣0️⃣
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        paragraph
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
          {brands.map((brand) => (
            <Grid item xs={6} sm={4} md={2} key={brand}>
              {" "}
              {/* Adjusted grid size for better spacing */}
              <StyledPaper elevation={3}>
                <img
                  src={`https://via.placeholder.com/80?text=${brand}`}
                  alt={brand}
                  loading="lazy"
                  style={{ width: "60px", height: "60px", marginBottom: "8px" }} // Adjusted image size
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "500",
                    color: "#333",
                    fontSize: "1rem",
                  }}
                >
                  {brand}
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
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="160" // Slightly taller images for better visuals
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
                      color: "#d32f2f", // Red price for emphasis
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
        </Grid>
      </Box>
    </StyledContainer>
  );
}
