"use client";

import React from "react";
import { useState } from "react";
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
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)", // Softer blue gradient
  borderRadius: "16px",
  boxShadow: "0 6px 24px rgba(0, 0, 0, 0.1)", // Softer, larger shadow
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
      "radial-gradient(circle at top left, rgba(255, 255, 255, 0.3), transparent)", // Subtle overlay gradient
    pointerEvents: "none",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff, #f5f5f5)", // Subtle gradient for table
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.05)", // Light border for definition
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "600",
  color: "#0d47a1", // Darker blue for headers
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque white for headers
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(33, 150, 243, 0.1)", // Light blue hover effect
    transform: "translateY(-2px)", // Slight lift on hover
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
    transform: "scale(1.03)", // Slight scale on hover
  },
}));

const AddButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #0288d1 30%, #4fc3f7 90%)", // Bright blue gradient
  color: "#fff",
  boxShadow: "0 2px 8px rgba(2, 136, 209, 0.3)",
  "&:hover": {
    background: "linear-gradient(90deg, #0277bd 30%, #29b6f6 90%)",
  },
}));

const SaveButton = styled(StyledButton)(({ theme }) => ({
  background: "linear-gradient(90deg, #388e3c 30%, #66bb6a 90%)", // Green gradient for save
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
    transform: "scale(1.1)", // Slight scale on hover
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
  const [categories, setCategories] = useState([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Headphones" },
    { id: 3, name: "iPad" },
    { id: 4, name: "Mouse" },
    { id: 5, name: "Keyboard" },
    { id: 6, name: "Monitor" },
    { id: 7, name: "Smartphone" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
  });

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setCurrentCategory({ id: null, name: "" });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: null, name: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === currentCategory.id
            ? { ...cat, name: currentCategory.name }
            : cat
        )
      );
    } else {
      const newCategory = {
        id: categories.length + 1,
        name: currentCategory.name,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    handleCloseDialog();
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
              <StyledTableRow key={category.id}>
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
                  <DeleteIconButton onClick={() => handleDelete(category.id)}>
                    <Trash2 size={18} color="#ef5350" />
                  </DeleteIconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

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
    </StyledContainer>
  );
}
