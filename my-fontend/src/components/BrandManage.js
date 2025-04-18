import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Paper, Grid, Typography, Button, Divider,
  TextField, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import API from "../utils/api";

import { notifySuccess, notifyError, NotifyContainer } from '../utils/notify';

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [newBrandName, setNewBrandName] = useState('');

  // Lấy dữ liệu brand từ API khi component được mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Hàm lấy toàn bộ brand
  const fetchBrands = async () => {
    try {
      const res = await API.get('/brands');
      setBrands(res.data);
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu:', error);
      notifyError(error.response.data.error);
    }
  };

  // Hàm thêm brand
  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      const res = await API.post(`/brands/add`, { name: newBrandName });
      setBrands([...brands, res.data]);
      setNewBrandName('');
      notifySuccess("Đã thêm mới thành công");
    } catch (error) {
      console.log('Lỗi khi thêm brand:', error);
      notifyError(error.response.data.error);
    }
  };

  // Hàm xoá brand
  const handleDeleteBrand = async (id) => {
    try {
      await API.delete(`/brands/delete/${id}`);
      setBrands(brands.filter(b => b._id !== id));
      notifySuccess("Đã xóa thành công");
    } catch (error) {
      console.log('Lỗi khi xoá brand:', error);
      notifyError(error.response.data.error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Quản lý Nhãn hàng</Typography>
        </Grid>

        {/* Form thêm brand */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Tên nhãn hàng mới"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="contained" onClick={handleAddBrand}>
              Thêm
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        {/* Bảng hiển thị danh sách brand */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Tên nhãn hàng</strong></TableCell>
                <TableCell align="right"><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>{brand._id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDeleteBrand(brand._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NotifyContainer/>
      </Paper>
    </Box>
  );
}
