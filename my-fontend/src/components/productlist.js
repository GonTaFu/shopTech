"use client";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { useEffect, useState } from "react";

import API from "../utils/api";
import { addToCart } from "../utils/cart";
import { notifySuccess, notifyError, NotifyContainer } from "../utils/notify";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14, // Reduced font size for smaller buttons
  padding: "5px 10px", // Smaller padding
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  fontSize: 14, // Reduced font size
  padding: "5px 10px", // Smaller padding
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const handleAddToCart = (id = null) => {
    if (!id) {
      notifyError("Không thể thêm sản phẩm");
      return;
    }
    addToCart(id, 1);
    notifySuccess("Đã thêm sản phẩm vào giỏ hàng");
  };

  useEffect(() => {
    // Gọi API lấy danh sách sản phẩm
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
      });
  }, []);

  return (
    <Container sx={{ mt: 4, px: { xs: 1, sm: 2, md: 3 }, width: "100%" }}>
      <NotifyContainer />
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Danh Sách Sản Phẩm
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            item
            key={product._id}
            xs={12}
            sm={6}
            md={3} // 4 items per row (12 / 3 = 4)
          >
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                height: "100%", // Ensure cards stretch to fill grid item
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 150, // Smaller fixed height for images
                  objectFit: "cover", // Ensures images scale uniformly
                  width: "100%", // Full card width
                }}
                image={product.images?.[0] || "/images/default.jpg"}
                alt={product.name || "Đồ công nghệ gì đó"}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 1.5, // Reduced padding for compact look
                }}
              >
                <div>
                  <Typography
                    variant="body1" // Smaller than h6
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    color="error"
                    sx={{
                      mt: 0.5,
                      mb: 1,
                      fontSize: 14, // Smaller font size
                      fontWeight: "bold",
                    }}
                  >
                    {product.price ? product.price.toLocaleString("vi-VN") : "Liên hệ"} VND
                  </Typography>
                </div>
                <Stack spacing={1} direction="row">
                  <ColorButton
                    href={`/products/${product._id}`}
                    variant="contained"
                  >
                    Xem chi tiết
                  </ColorButton>
                  {product.quantity > 0 ? (
                    <BootstrapButton
                      variant="contained"
                      disableRipple
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Thêm vào giỏ
                    </BootstrapButton>
                  ) : (
                    <Button variant="contained" disabled>
                      Hết hàng
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;