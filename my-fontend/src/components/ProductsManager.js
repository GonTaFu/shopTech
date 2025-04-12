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

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const baseData = {
    name: "",
    price: 0,
    brand: "",
    category: "",
    description: "",
    images: ["", "", ""],
  };
  const [formData, setFormData] = useState(baseData);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Tên sản phẩm không được để trống";
    if (formData.price === "") errors.price = "Giá không được để trống";
    else if (isNaN(formData.price)) errors.price = "Giá phải là số";
    else if (parseInt(formData.price) < 0) errors.price = "Giá phải ≥ 0";

    if (!formData.category) errors.category = "Chọn loại sản phẩm";
    if (!formData.brand) errors.brand = "Chọn hãng sản phẩm";
    return errors;
  }

  const fetchAPI = async () => {
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
      return true;
    } catch (err) {
      console.error("Lỗi khi fetch:", err);
      return false;
    }
  }

  const handleOpenDialog = async (product = null) => {
    const checkPorduct = { ...product };
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

    var productFormData = {...formData};
    productFormData.price = parseInt(productFormData.price);

    try {
      if (editingProduct) {
        const res = await API.put(`/products/update/${editingProduct._id}`, productFormData);
        console.log("Da update thanh cong");
      }
      else {
        const res = await API.post("/products/add", productFormData);
        console.log("Đã gửi lên server:", res.data);
      }
    }
    catch (err) {
      console.log(`Lỗi khi phản hồi tới hệ thống máy chủ ${err}`);
    }

    const resFetch = await fetchAPI();
    
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
    fetchAPI()
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
            <FormControl fullWidth margin="dense" error={!!formErrors.category}>
              <InputLabel>Loại sản phẩm</InputLabel>
              <Select
                required
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
            <FormControl fullWidth margin="dense" error={!!formErrors.brand}>
              <InputLabel>Hãng</InputLabel>
              <Select
                required
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
