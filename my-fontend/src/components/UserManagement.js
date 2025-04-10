"use client";

import { useEffect, useState } from "react";
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const API_BASE_URL = "http://localhost:3000";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    roleId: "",
    password: "",
    phoneNumber: ""
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts`);
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
    setFormData(user || {
      name: "",
      emailAddress: "",
      roleId: "",
      password: "",
      phoneNumber: ""
    });
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
    const { name, password, phoneNumber, emailAddress, roleId } = formData;

    // Kiểm tra dữ liệu trước khi gửi
    if (!name || !password || !phoneNumber || !emailAddress || !roleId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const method = editingUser ? "PUT" : "POST";
      const endpoint = editingUser
        ? `${API_BASE_URL}/api/accounts/update/${editingUser._id}`
        : `${API_BASE_URL}/api/accounts/add`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchUsers();
        handleClose();
      } else {
        const errorData = await res.json();
        alert(`Lỗi khi lưu: ${errorData.message || "Không xác định"}`);
      }
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      alert("Đã xảy ra lỗi khi lưu.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/accounts/delete/${id}`, { method: "DELETE" });
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
          <TextField
            name="name"
            label="Họ tên"
            value={formData.name}
            onChange={handleChange}
            fullWidth sx={{ mt: 2 }}
          />
          <TextField
            name="password"
            label="Mật khẩu"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth sx={{ mt: 2 }}
          />
          <TextField
            name="phoneNumber"
            label="Số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth sx={{ mt: 2 }}
          />
          <TextField
            name="emailAddress"
            label="Email"
            value={formData.emailAddress}
            onChange={handleChange}
            fullWidth sx={{ mt: 2 }}
          />
          <TextField
            name="roleId"
            label="Quyền"
            value={formData.roleId}
            onChange={handleChange}
            fullWidth sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
