import { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid2";
import { Edit, Delete } from "@mui/icons-material";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Giả lập API fetch brands
    setTimeout(() => {
      setBrands([
        { id: 1, name: "Sony" },
        { id: 2, name: "Logitech" },
        { id: 3, name: "LG" },
      ]);
    }, 500);

    // Giả lập API fetch categories
    setTimeout(() => {
      setCategories([
        { id: 1, name: "Tai nghe" },
        { id: 2, name: "Bàn phím" },
        { id: 3, name: "Sạc dự phòng" },
        { id: 4, name: "CPU" },
      ]);
    }, 500);

    // Giả lập API fetch products
    setTimeout(() => {
      const fakeData = [
        {
          id: 1,
          name: "Tai nghe Bluetooth",
          price: "990000",
          brand: "Sony",
          category: "Tai nghe",
        },
        {
          id: 2,
          name: "Bàn phím cơ",
          brand: "Logitech",
          price: "1290000",
          category: "Bàn phím",
        },
      ];
      setProducts(fakeData);
    }, 500);
  }, []);

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    setFormData(product || { name: "", price: "", category: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", price: "", category: "" });
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingProduct) {
      // Update
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      // Create
      const newProduct = { ...formData, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý Sản phẩm
      </Typography>

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

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Hãng</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Loại sản phẩm</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>{prod.brand}</TableCell>
                <TableCell>{Number(prod.price).toLocaleString()}đ</TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(prod)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(prod.id)}>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
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
                <MenuItem key={c.id} value={c.name}>
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
                <MenuItem key={b.id} value={b.name}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Huỷ</Button>
          <Button onClick={handleSave} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsManager;
