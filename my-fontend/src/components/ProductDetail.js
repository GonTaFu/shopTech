
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
} from "@mui/material";

import Box from "@mui/material/Box";
<<<<<<< HEAD
import Grid from "@mui/material/Grid";
=======
import Grid from "@mui/material/Grid2";
import Link from "next/link";
>>>>>>> fbe692924e3ee093789d92a74181759adda250f8

const TableProductDetail = ({ product }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {Object.entries(product).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
              <TableCell>
                {typeof value === "object" ? JSON.stringify(value) : value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductDetail = ({ product }) => {
  const data_table = { ...product };
  delete data_table.images;
  delete data_table.description;
  return (
    <>
      <Container sx={{ py: 4 }} maxWidth="md">
        <CssBaseline />
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 1, sm: 4, md: 8 }}
          >
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={product.images[0]}
                  title={product.name}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                  SKU: {product.id}
                </Typography>
                <Rating name="read-only" value={product.rate} readOnly />
                <Typography gutterBottom variant="h8" component="div">
                  $ {product.price}
                </Typography>
                <Typography variant="h8" component="div">
                  Brand: {product.brand}
                </Typography>
                <Typography variant="h8" component="div">
                  Status: {product.status}
                </Typography>
                <Typography variant="h8" component="div">
                  Warranty: {product.warranty}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions bgcolor="text.disabled">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Buy Now
                </Button>
              </CardActions>
              <CardActions bgcolor="text.disabled">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<FavoriteBorderIcon />}
                >
                  Add to whish list
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ py: 4}} maxWidth="md">
        {/* <TableProductDetail product={data_table}></TableProductDetail> */}
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 4, md: 8 }}
        >
          <Grid size={{ xs: 6, md: 5 }}>
          <Typography gutterBottom variant="h5" component="div">
                  Mô tả sản phẩm
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          {product.description}
          </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
          <Typography gutterBottom variant="h5" component="div">
                  Thông tin chi tiết
          </Typography>
            <TableProductDetail product={data_table}></TableProductDetail>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetail;
