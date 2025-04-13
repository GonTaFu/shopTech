"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert, // Thêm Alert cho Snackbar
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";

// Styled Components (giữ nguyên)
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  borderRadius: "16px",
  boxShadow: "0 6px 24px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top left, rgba(255, 255, 255, 0.3), transparent)",
    pointerEvents: "none",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "600",
  color: "#0d47a1",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: theme.spacing(1.5, 3),
  fontWeight: "bold",
  fontSize: "1rem",
  textTransform: "none",
  transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const AddButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #0288d1 30%, #4fc3f7 90%)",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(2, 136, 209, 0.3)",
  "&:hover": {
    background: "linear-gradient(90deg, #0277bd 30%, #29b6f6 90%)",
  },
}));

const SaveButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #388e3c 30%, #66bb6a 90%)",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(56, 142, 60, 0.3)",
  "&:hover": {
    background: "linear-gradient(90deg, #2e7d32 30%, #4caf50 90%)",
  },
}));

const CancelButton = styled(StyledButton)(({ theme }) => ({
  borderColor: "#ef5350",
  color: "#ef5350",
  backgroundColor: "transparent",
  borderWidth: "2px",
  "&:hover": {
    backgroundColor: "rgba(239, 83, 80, 0.1)",
    borderColor: "#e53935",
    color: "#e53935",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "color 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    color: "#0288d1",
    transform: "scale(1.1)",
  },
}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  transition: "color 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    color: "#ef5350",
    transform: "scale(1.1)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 2px 12px rgba(2, 136, 209, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#0d47a1",
    fontWeight: "500",
    fontSize: "1rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#0288d1",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0288d1",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0288d1",
    borderWidth: "2px",
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
  },
}));

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    _id: null,
    name: "",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Thêm state cho Snackbar

  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.error("Failed to fetch categories:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setCurrentCategory({ _id: null, name: "" });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/categories/${categoryToDelete._id}`
      );
      if (response.data.success) {
        setCategories((prev) =>
          prev.filter((cat) => cat._id !== categoryToDelete._id)
        );
      } else {
        console.error("Failed to delete category:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }
    handleCloseDeleteDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ _id: null, name: "" });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `${API_URL}/categories/${currentCategory._id}`,
          { name: currentCategory.name }
        );
        if (response.data.success) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === currentCategory._id ? response.data.data : cat
            )
          );
        } else {
          console.error("Failed to update category:", response.data.message);
          alert(response.data.message);
          return;
        }
      } else {
        const response = await axios.post(`${API_URL}/categories`, {
          name: currentCategory.name,
        });
        if (response.data.success) {
          setCategories((prev) => [...prev, response.data.data]);
          setOpenSnackbar(true); // Hiển thị thông báo "Thêm thành công"
        } else {
          console.error("Failed to create category:", response.data.message);
          alert(response.data.message);
          return;
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An error occurred while saving the category.");
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#0d47a1",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            background: "linear-gradient(to right, #0d47a1, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            borderLeft: "5px solid #42a5f5",
            paddingLeft: "16px",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: 0,
              width: "60px",
              height: "4px",
              background: "linear-gradient(to right, #42a5f5, transparent)",
            },
          }}
        >
          Quản lý loại sản phẩm
        </Typography>
        <AddButton
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={handleOpenAddDialog}
        >
          Thêm loại
        </AddButton>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell>Tên loại</StyledTableCell>
              <StyledTableCell align="right">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <StyledTableRow key={category._id}>
                <TableCell sx={{ fontWeight: "500", color: "#424242" }}>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#0d47a1",
                      fontSize: "1.05rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {category.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <StyledIconButton
                    onClick={() => handleOpenEditDialog(category)}
                  >
                    <Edit size={18} color="#0288d1" />
                  </StyledIconButton>
                  <DeleteIconButton
                    onClick={() => handleOpenDeleteDialog(category)}
                  >
                    <Trash2 size={18} color="#ef5350" />
                  </DeleteIconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Dialog thêm/sửa danh mục */}
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #0288d1 30%, #4fc3f7 90%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          {isEditing ? "Chỉnh sửa loại" : "Thêm loại mới"}
          <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Tên loại sản phẩm"
              type="text"
              fullWidth
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions
          sx={{ padding: "16px 24px", backgroundColor: "#fafafa" }}
        >
          <CancelButton
            variant="outlined"
            onClick={handleCloseDialog}
            startIcon={<X size={20} />}
          >
            Hủy
          </CancelButton>
          <SaveButton
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Save size={20} />}
          >
            Lưu
          </SaveButton>
        </DialogActions>
      </StyledDialog>

      {/* Dialog xác nhận xóa danh mục */}
      <StyledDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #d32f2f 30%, #ef5350 90%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          Xác nhận xóa
          <IconButton onClick={handleCloseDeleteDialog} sx={{ color: "#fff" }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <DialogContentText sx={{ color: "#424242", fontSize: "1.1rem" }}>
            Bạn có chắc chắn muốn xóa danh mục{" "}
            <strong>{categoryToDelete?.name}</strong>? Hành động này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ padding: "16px 24px", backgroundColor: "#fafafa" }}
        >
          <CancelButton
            variant="outlined"
            onClick={handleCloseDeleteDialog}
            startIcon={<X size={20} />}
          >
            Hủy
          </CancelButton>
          <StyledButton
            variant="contained"
            onClick={handleDelete}
            sx={{
              background: "linear-gradient(90deg, #d32f2f 30%, #ef5350 90%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, #c62828 30%, #e53935 90%)",
              },
            }}
            startIcon={<Trash2 size={20} />}
          >
            Xóa
          </StyledButton>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar thông báo thêm thành công */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Tự đóng sau 3 giây
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Hiển thị ở trên cùng giữa màn hình
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thêm thành công!
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
}
