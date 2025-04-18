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

import { useSearchParams } from "next/navigation";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
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
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const ProductListSearch = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();

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
    API.get(`/products/search`, { params: { q: searchParams.get("q") || "" } })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
      });
  }, []);

  return (
    <Container
      sx={{
        mt: 5,
        px: { xs: 1, sm: 2, md: 3 },
        width: "100%",
        marginBottom: "100%",
      }}
    >
      <NotifyContainer />
      {(products.length <= 0 && (
        <Container spacing={2}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            <center>Tìm Kiếm</center>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            <center>Không thể tìm thấy sản phẩm</center>
          </Typography>
        </Container>
      )) || (
        <>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            <center>Danh Sách Sản Phẩm Tìm Kiếm</center>
          </Typography>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid sx={{ gridColumn: 'span 12' }} key={product._id} size={{xs:12, sm:6, md:4, lg:3, xl:2}}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={product.images?.[0] || "images/default.jpg"}
                    alt="Đồ công nghệ gì đó"
                  />

                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography
                      color="error"
                      sx={{
                        marginTop: 1,
                        marginBottom: 1,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {product.price.toLocaleString()} VND
                    </Typography>

                    <Stack spacing={2} direction="row">
                      <ColorButton
                        href={`/products/${product._id}`}
                        variant="contained"
                      >
                        Xem chi tiết
                      </ColorButton>

                      {(product.quantity > 0 && (
                        <BootstrapButton
                          variant="contained"
                          disableRipple
                          onClick={() => {
                            handleAddToCart(product._id);
                          }}
                        >
                          Thêm vào giỏ hàng
                        </BootstrapButton>
                      )) || (
                        <Button variant="contained" disabled>
                          Sản phẩm đã hết
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductListSearch;
