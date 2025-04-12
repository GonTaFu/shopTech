"use client";
import { useState, useEffect } from "react";
import API from "../utils/api";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const baseData = {
    name: "",
    price: 0,
    brand: "",
    category: "",
    description: "",
    images: ["", "", ""],
  };
  const [formData, setFormData] = useState(baseData);

  const handleOpenDialog = async (product = null) => {
    const checkPorduct = await { ...product };
    if (checkPorduct) {
      checkPorduct.brand = (await checkPorduct.brand?._id) || "";
      checkPorduct.category = (await checkPorduct.category?._id) || "";
    }

    setEditingProduct(product);
    if (product == null) {
      setFormData(baseData)
    }
    else {
      setFormData(checkPorduct)
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
    setFormData(baseData);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editingProduct) {
      // Update

      // console.log(`Update: /products/update/${editingProduct._id}`);
      var product = { ...formData };
      await console.log("Product update: ", product);

      try {
        product.price = parseInt(product.price);
        const res = await API.put(`/products/update/${editingProduct._id}`, product);
        console.log("Da update thanh cong");

        const productsData = await API.get("/products");
        setProducts(productsData.data);
      } catch (err) {}
    } else {
      // Create
      const newProduct = { ...formData };
      newProduct.price = parseInt(newProduct.price);
      try {
        const res = await API.post("/products/add", newProduct);
        console.log("Đã gửi lên server:", res.data);

        // Gộp dữ liệu trả về từ server (có _id) vào danh sách sản phẩm
        const productsData = await API.get("/products");
        setProducts(productsData.data);
      } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
      }
    }
    handleCloseDialog();
  };

  const handleDelete = async (id = null) => {
    try {
      console.log("handleDelete: ", id)
      if (id == null) return;
      
      const res = await API.delete(`/products/delete/${id}`);

      const productsData = await API.get("/products");
      setProducts(productsData.data);

      console.log(res)
    }
    catch (err) {

    }
  }

  // Lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsRes = await API.get("/brands");
        const categoriesRes = await API.get("/categories");
        const productsRes = await API.get("/products");

        setBrands(brandsRes.data);
        setCategories(categoriesRes.data.data);

        productsRes.data.map((p) => {
          delete p.show;
          delete p.__v;
        });

        setProducts(productsRes.data);

        console.log("Dữ liệu đã load xong");
      } catch (err) {
        console.error("Lỗi khi fetch:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* {console.log("Products: ", products)}
        {console.log("Categories: ", categories)}
        {console.log("Brands: ", brands)} */}
      <Container sx={{}}>
        {/* Nút thêm sản phẩm */}
        <Container>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid size={{ xs: 2, sm: 4, md: 6 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
              >
                Thêm sản phẩm
              </Button>
            </Grid>
          </Grid>
        </Container>

        {/* Hiển thị danh sách sản phẩm */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>ID</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Loại sản phẩm</TableCell>
                <TableCell>Hãng</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod._id}>
                  <TableCell>{prod._id}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.category.name}</TableCell>
                  <TableCell>{prod.brand.name}</TableCell>
                  <TableCell>{prod.price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(prod)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(prod._id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Chưa có sản phẩm
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog thêm / sửa */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          disableRestoreFocus
        >
          <DialogTitle>
            {editingProduct ? "Chỉnh sửa" : "Thêm"} sản phẩm
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tên sản phẩm"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Giá (VNĐ)"
              fullWidth
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Loại sản phẩm</InputLabel>

              <Select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                label="Loại sản phẩm"
              >
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Hãng</InputLabel>
              <Select
                name="brand"
                value={formData.brand || ""}
                onChange={handleChange}
                label="Hãng"
              >
                {brands.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              label="Mô tả"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Typography sx={{ mt: 2 }}>Ảnh sản phẩm</Typography>
            {formData.images?.map((img, index) => (
              <TextField
                key={index}
                margin="dense"
                label={`Ảnh ${index + 1}`}
                fullWidth
                name={`image-${index}`}
                value={img}
                onChange={(e) => {
                  const newImages = [...formData.images];
                  newImages[index] = e.target.value;
                  setFormData({ ...formData, images: newImages });
                }}
              />
            )) || console.log("K: ", formData.images)}
            {/* {console.log("Form Data: ", formData)} */}
            {console.log("Editing products: ", editingProduct)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Huỷ</Button>
            <Button onClick={handleSave} variant="contained">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ProductsManager;
