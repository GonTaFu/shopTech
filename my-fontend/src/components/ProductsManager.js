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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Delete } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";

import HandleServerError from "./HandleServerError";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formErrors, setFormErrors] = useState({});
  const [errorServer, setErrorServer] = useState(false);

  const [title, setTitle] = useState("Danh sách sản phẩm");
  const [isTrash, setIsTrash] = useState(false);

  const baseData = {
    name: "",
    price: 0,
    brand: "",
    category: "",
    description: "",
    images: ["", "", ""],
    quantity: 0, 
    warranty: 0
  };
  const [formData, setFormData] = useState(baseData);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Tên sản phẩm không được để trống";

    if (formData.price === "") errors.price = "Giá không được để trống";
    else if (isNaN(formData.price)) errors.price = "Giá phải là số";
    else if (parseInt(formData.price) < 0) errors.price = "Giá phải ≥ 0";

    if (formData.quantity === "") errors.quantity = "Số lượng không được để trống";
    else if (isNaN(formData.quantity)) errors.quantity = "Số lượng phải là số";
    else if (parseInt(formData.quantity) < 0) errors.quantity = "Số lượng phải ≥ 0";

    if (formData.warranty === "") errors.warranty = "Thời hạn (tháng) không được để trống";
    else if (isNaN(formData.warranty)) errors.warranty = "Thời hạn (tháng) phải là số";
    else if (parseInt(formData.warranty) < 0) errors.warranty = "Thời hạn (tháng) phải ≥ 0";

    if (!formData.category) errors.category = "Chọn loại sản phẩm";
    if (!formData.brand) errors.brand = "Chọn hãng sản phẩm";
    return errors;
  };

  const fetchAPI = async (isTrash = false) => {
    try {
      const brandsRes = await API.get("/brands");
      const categoriesRes = await API.get("/categories");
      var productsRes = await API.get(
        isTrash ? "/products/trash" : "/products"
      );

      setBrands(brandsRes.data);
      setCategories(categoriesRes.data.data);

      productsRes.data.map((p) => {
        delete p.show;
        delete p.__v;
      });

      setProducts(productsRes.data);

      if (
        brandsRes.status !== 200 ||
        categoriesRes.status !== 200 ||
        productsRes.status !== 200
      ) {
        setErrorServer(true);
        return;
      }

      setErrorServer(false);
    } catch (err) {
      setErrorServer(true);
    }
  };

  const handleOpenDialog = async (product = null) => {
    const checkProduct = { ...product };
    if (checkProduct) {
      checkProduct.brand = checkProduct.brand?._id || "";
      checkProduct.category = checkProduct.category?._id || "";
    }

    setEditingProduct(product);
    if (product == null) {
      setFormData(baseData);
    } else {
      setFormData(checkProduct);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
    setFormData(baseData);
    setEditingProduct(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    var productFormData = { ...formData };
    productFormData.price = parseInt(productFormData.price);

    try {
      if (editingProduct) {
        const res = await API.put(
          `/products/update/${editingProduct._id}`,
          productFormData
        );
        console.log("Da update thanh cong");
      } else {
        const res = await API.post("/products/add", productFormData);
        console.log("Đã gửi lên server:", res.data);
      }
    } catch (err) {
      setErrorServer(true);
    }

    const resFetch = await fetchAPI();

    handleCloseDialog();
  };

  const handleDelete = async (id = null, isTrash = false) => {
    try {
      if (id == null) return;

      const url = isTrash
        ? `/products/destroy/${id}` // Xoá vĩnh viễn
        : `/products/delete/${id}`; // Xoá vào thùng rác

      const res = await API.delete(url);

      fetchAPI();
    } catch (err) {
      setErrorServer(true);
    }
  };

  const handleRestore = async (id = null) => {    
    try {
      if (id == null) return;
      const res = await API.patch(`/products/restore/${id}`);

      await fetchAPI(true);
    } catch (err) {setErrorServer(true);}
  };

  const handleOpenTrash = async () => {
    try {
      setIsTrash(true);
      setTitle("Thùng rác");
      await fetchAPI(true);
    } catch (err) {
      setErrorServer(true);
    }
  };

  const handleCloseTrash = async () => {
    try {
      setIsTrash(false);
      setTitle("Danh sách sản phẩm");
      await fetchAPI();
    } catch (err) {
      setErrorServer(true);
    }
  };

  // Lấy dữ liệu
  useEffect(() => {
    fetchAPI();
  }, []);

  if (errorServer) {
    return <HandleServerError />;
  }

  return (
    <>
      <Container sx={{}}>
        <Container sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <Typography gutterBottom variant="h2" component="div">
            <center>Quản lý sản phẩm: {title} </center>
          </Typography>
        </Container>
        {/* Nút thêm sản phẩm */}

        <Container>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {isTrash === false && (
              <>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                  >
                    Thêm sản phẩm
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenTrash()}
                  >
                    <Delete />
                    Thùng rác
                  </Button>
                </Grid>
              </>
            )}
            {isTrash === true && (
              <>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCloseTrash()}
                  >
                    Quay về
                  </Button>
                </Grid>
              </>
            )}
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
                  <TableCell>{prod.category?.name || "Không có"}</TableCell>
                  <TableCell>{prod.brand?.name || "Không có"}</TableCell>
                  <TableCell>{prod.price}</TableCell>
                  <TableCell align="right">
                    {isTrash === false && (
                      <IconButton onClick={() => handleOpenDialog(prod)}>
                        <Edit />
                      </IconButton>
                    )}
                    {isTrash === true && (
                      <IconButton onClick={() => handleRestore(prod._id)}>
                        <RestoreIcon color="primary" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(prod._id, isTrash)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Chưa có sản phẩm
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog thêm / sửa */}
        <Dialog open={openDialog} onClose={handleCloseDialog} disableRestoreFocus>
          <DialogTitle>
            {editingProduct ? "Chỉnh sửa" : "Thêm"} sản phẩm
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              label="Tên sản phẩm"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              required
              margin="dense"
              label="Giá (VNĐ)"
              fullWidth
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!formErrors.price}
              helperText={formErrors.price}
            />
            <TextField
              required
              margin="dense"
              label="Số lượng"
              fullWidth
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              error={!!formErrors.quantity}
              helperText={formErrors.quantity}
            />
            <TextField
              required
              margin="dense"
              label="Mô tả"
              fullWidth
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="brand">Hãng sản phẩm</InputLabel>
              <Select
                labelId="brand"
                value={formData.brand}
                label="Hãng"
                onChange={handleChange}
                name="brand"
                error={!!formErrors.brand}
              >
                {brands.map((brand) => (
                  <MenuItem value={brand._id} key={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="category">Loại sản phẩm</InputLabel>
              <Select
                labelId="category"
                value={formData.category}
                label="Loại sản phẩm"
                onChange={handleChange}
                name="category"
                error={!!formErrors.category}
              >
                {categories.map((category) => (
                  <MenuItem value={category._id} key={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleSave} color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ProductsManager;
