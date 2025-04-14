"use client";

import { useEffect, useState } from "react";
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import API from "../utils/api"; // đảm bảo đúng path tới util/api.js

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
      const res = await API.get("/accounts");
      setUsers(res.data);
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

    if (!name || !password || !phoneNumber || !emailAddress || !roleId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      if (editingUser) {
        await API.put(`/accounts/update/${editingUser._id}`, formData);
      } else {
        await API.post("/accounts/add", formData);
      }
      fetchUsers();
      handleClose();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      alert(`Lỗi khi lưu: ${err.response?.data?.message || "Không xác định"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await API.delete(`/accounts/delete/${id}`);
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
          <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Quyền</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                name="roleId"
                value={formData.roleId}
                label="Quyền"
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={handleSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
