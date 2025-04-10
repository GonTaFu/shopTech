// components/userManagement.js
"use client";

import { useEffect, useState } from "react";
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", emailAddress: "", roleId: "" });

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/accounts"); // ✅ sửa port
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setFormData(user || { name: "", emailAddress: "", roleId: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const method = editingUser ? "PUT" : "POST";
      const endpoint = editingUser
        ? `http://localhost:3001/api/accounts/update/${editingUser._id}` // ✅ sửa port
        : "http://localhost:3001/api/accounts/add";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchUsers();
        handleClose();
      }
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await fetch(`http://localhost:3001/api/accounts/delete/${id}`, { method: "DELETE" }); // ✅ sửa port
      fetchUsers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Quản lý người dùng</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
        Thêm người dùng
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.emailAddress}</TableCell>
                  <TableCell>{user.roleId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(user)} startIcon={<EditIcon />}>Sửa</Button>
                    <Button color="error" onClick={() => handleDelete(user._id)} startIcon={<DeleteIcon />}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">Chưa có người dùng nào.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Họ tên" value={formData.name} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
          <TextField name="emailAddress" label="Email" value={formData.emailAddress} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
          <TextField name="roleId" label="Quyền" value={formData.roleId} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
