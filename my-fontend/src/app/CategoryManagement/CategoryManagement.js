"use client";
//please work
import React from "react"; // ✅ Bắt buộc để tránh lỗi React is not defined
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
  Collapse,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ... (toàn bộ phần code xử lý state và render như bạn có ở file trước)

// Styled components omitted here for brevity (same as your previous setup)
// If you want them back, let me know!

export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Laptop",
      subcategories: ["ASUS", "Dell", "HP"],
    },
    {
      id: 2,
      name: "Headphones",
      subcategories: ["Sony", "JBL"],
    },
    {
      id: 3,
      name: "iPad",
      subcategories: ["Air", "Pro", "Mini"],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
    subcategories: [],
  });
  const [currentParentId, setCurrentParentId] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setIsSub(false);
    setCurrentCategory({ id: null, name: "", subcategories: [] });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setIsEditing(true);
    setIsSub(false);
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleOpenAddSubcategory = (parentId) => {
    setIsSub(true);
    setCurrentParentId(parentId);
    setCurrentCategory({ name: "" });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleDeleteSub = (catId, subIndex) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter((_, i) => i !== subIndex),
            }
          : cat
      )
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: null, name: "", subcategories: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSub) {
      // Add subcategory
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === currentParentId
            ? {
                ...cat,
                subcategories: [...cat.subcategories, currentCategory.name],
              }
            : cat
        )
      );
    } else if (isEditing) {
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
        subcategories: [],
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    handleCloseDialog();
  };

  const toggleExpand = (id) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Quản lý loại sản phẩm
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={handleOpenAddDialog}
        >
          Thêm loại
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên loại</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => toggleExpand(category.id)}>
                        {expandedCategory === category.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </IconButton>
                      {category.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenEditDialog(category)}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenAddSubcategory(category.id)}
                    >
                      <Plus size={18} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{ padding: 0, border: 0 }}>
                    <Collapse in={expandedCategory === category.id}>
                      <Box sx={{ pl: 7, py: 1 }}>
                        {category.subcategories.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            Chưa có danh mục con
                          </Typography>
                        ) : (
                          <ul>
                            {category.subcategories.map((sub, i) => (
                              <li key={i}>
                                {sub}
                                <IconButton
                                  onClick={() =>
                                    handleDeleteSub(category.id, i)
                                  }
                                  size="small"
                                  sx={{ ml: 1 }}
                                >
                                  <Trash2 size={14} />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isSub
            ? "Thêm danh mục con"
            : isEditing
            ? "Chỉnh sửa loại"
            : "Thêm loại mới"}
          <IconButton onClick={handleCloseDialog}>
            <X />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label={isSub ? "Tên danh mục con" : "Tên loại sản phẩm"}
              type="text"
              fullWidth
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseDialog}
            startIcon={<X />}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Save />}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
