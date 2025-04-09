"use client";
import { useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "User" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
    { id: 3, name: "Admin", email: "admin@example.com", role: "Admin" },
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "", email: "", role: "" });

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setFormData(user || { id: "", name: "", email: "", role: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
    } else {
      setUsers([...users, { ...formData, id: users.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Quản lý người dùng</Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()}>Thêm người dùng</Button>
      
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(user)} startIcon={<EditIcon />}>Sửa</Button>
                  <Button color="error" onClick={() => handleDelete(user.id)} startIcon={<DeleteIcon />}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</DialogTitle>
        <DialogContent>
          <TextField label="Họ và tên" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
          <TextField label="Quyền" name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleSave} color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}