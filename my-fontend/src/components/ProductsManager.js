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
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Delete } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";

import HandleServerError from "./HandleServerError";

import { notifySuccess, NotifyContainer, notifyError } from "../utils/notify";

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
    warranty: 0,
  };
  const [formData, setFormData] = useState(baseData);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Tên sản phẩm không được để trống";

    if (formData.price === "") errors.price = "Giá không được để trống";
    else if (isNaN(formData.price)) errors.price = "Giá phải là số";
    else if (parseInt(formData.price) < 0) errors.price = "Giá phải ≥ 0";

    if (formData.quantity === "")
      errors.quantity = "Số lượng không được để trống";
    else if (isNaN(formData.quantity)) errors.quantity = "Số lượng phải là số";
    else if (parseInt(formData.quantity) < 0)
      errors.quantity = "Số lượng phải ≥ 0";

    if (formData.warranty === "")
      errors.warranty = "Thời hạn (tháng) không được để trống";
    else if (isNaN(formData.warranty))
      errors.warranty = "Thời hạn (tháng) phải là số";
    else if (parseInt(formData.warranty) < 0)
      errors.warranty = "Thời hạn (tháng) phải ≥ 0";

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

      setProducts(productsRes.data);

      if (
        brandsRes.status != 200 ||
        categoriesRes.status != 200 ||
        productsRes.status != 200
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
    const checkPorduct = { ...product };
    if (checkPorduct) {
      checkPorduct.brand = checkPorduct.brand?._id || "";
      checkPorduct.category = checkPorduct.category?._id || "";
    }

    setEditingProduct(product);
    if (product == null) {
      setFormData(baseData);
    } else {
      setFormData(checkPorduct);
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
      notifyError("Chưa điền thông tin hoặc điền thông tin sai định dạng");
      return;
    }

    var productFormData = { ...formData };
    productFormData.price = parseInt(productFormData.price);

    try {
      if (editingProduct) {
        await API.put(
          `/products/update/${editingProduct._id}`,
          productFormData
        );
        notifySuccess("Cập nhập sản phẩm thành công");
      } else {

        await API.post("/products/add", productFormData);
        notifySuccess("Tạo sản phẩm thành công");
      }
    } catch (error) {
      // setErrorServer(true);
      console.log(error);
      notifyError("Lỗi hệ thống");
    }

    await fetchAPI();

    handleCloseDialog();
  };

  const handleDelete = async (id = null, isTrash = false) => {
    try {
      if (id == null) return;

      const url = isTrash
        ? `/products/destroy/${id}` // Xoá vĩnh viễn
        : `/products/delete/${id}`; // Xoá vào thùng rác

      await API.delete(url);

      if (isTrash) {
        notifySuccess("Đã xóa vĩnh viễn");
      } else notifySuccess("Đã xóa vào thùng rác");

      fetchAPI();
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
    }
  };

  const handleRestore = async (id = null) => {
    try {
      if (id == null) return;
      await API.patch(`/products/restore/${id}`);

      notifySuccess("Khôi phục thành công");

      await fetchAPI(true);
    } catch (error) {
      setErrorServer(true);
      notifyError("Lỗi hệ thống");
    }
  };

  const handleOpenTrash = async () => {
    setIsTrash(true);
    setTitle("Thùng rác");
    await fetchAPI(true);
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
    return <HandleServerError></HandleServerError>;
  }

  if (products.length <= 0) {
    return (
      <>
        <Container>
          <Container sx={{ marginTop: "5%", marginBottom: "5%" }}>
            <Typography gutterBottom variant="h2" component="div">
              <center>Quản lý sản phẩm: {title} </center>
            </Typography>
          </Container>
          <NotifyContainer />
          {/* Nút thêm sản phẩm */}

          <Container>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {isTrash == false && (
                <>
                  <Grid size={{ xs: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog()}
                    >
                      Thêm sản phẩm
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenTrash()}
                    >
                      <Delete></Delete>
                      Thùng rác
                    </Button>
                  </Grid>
                </>
              )}
              {isTrash == true && (
                <>
                  <Grid size={{ xs: 2 }}>
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
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Chưa có sản phẩm
                  </TableCell>
                </TableRow>
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
                label="Thời hạn bảo hành (tháng)"
                fullWidth
                name="warranty"
                type="number"
                value={formData.warranty}
                onChange={handleChange}
                error={!!formErrors.warranty}
                helperText={formErrors.warranty}
              />
              <FormControl
                fullWidth
                margin="dense"
                error={!!formErrors.category}
              >
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
              ))}
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
  }

  return (
    <>
      <Container sx={{}}>
        <Container sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <Typography gutterBottom variant="h2" component="div">
            <center>Quản lý sản phẩm: {title} </center>
          </Typography>
        </Container>
        <NotifyContainer />
        {/* Nút thêm sản phẩm */}

        <Container>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {isTrash == false && (
              <>
                <Grid size={{ xs: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                  >
                    Thêm sản phẩm
                  </Button>
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenTrash()}
                  >
                    <Delete></Delete>
                    Thùng rác
                  </Button>
                </Grid>
              </>
            )}
            {isTrash == true && (
              <>
                <Grid size={{ xs: 2 }}>
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
                  <TableCell>
                    <Link href={`/products/${prod._id}`} underline="none">
                      {prod._id}
                    </Link>
                  </TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.category.name}</TableCell>
                  <TableCell>{prod.brand.name}</TableCell>
                  <TableCell>{prod.price.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">
                    {isTrash == false && (
                      <IconButton onClick={() => handleOpenDialog(prod)}>
                        <Edit />
                      </IconButton>
                    )}
                    {isTrash == true && (
                      <>
                        <IconButton onClick={() => handleRestore(prod._id)}>
                          <RestoreIcon color="primary" />
                        </IconButton>
                      </>
                    )}
                    <IconButton onClick={() => handleDelete(prod._id, isTrash)}>
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
              label="Thời hạn bảo hành (tháng)"
              fullWidth
              name="warranty"
              type="number"
              value={formData.warranty}
              onChange={handleChange}
              error={!!formErrors.warranty}
              helperText={formErrors.warranty}
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
            ))}
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
