"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import API from "../utils/api";
import HandleLoading from "./HandleLoading";
import { notifySuccess, notifyError, NotifyContainer } from "../utils/notify";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState({ open: false, order: null });

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Lỗi khi load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Xóa đơn hàng
  const handleDelete = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      notifySuccess("Xóa đơn hàng thành công");
      fetchOrders();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      notifyError("Lỗi khi xóa đơn hàng");
    }
  };

  const handleOpenEdit = (order) => {
    setEditDialog({ open: true, order });
  };

  const handleCloseEdit = () => {
    setEditDialog({ open: false, order: null });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDialog((prev) => ({
      ...prev,
      order: {
        ...prev.order,
        [name]: value,
      },
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      const { _id, name, phoneNumber, address, status } = editDialog.order;
      await API.put(`/orders/${_id}`, { name, phoneNumber, address, status });
      notifySuccess("Cập nhật đơn hàng thành công");
      handleCloseEdit();
      fetchOrders();
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      notifyError("Lỗi khi cập nhật đơn hàng");
    }
  };

  return (
    <Container p={4} sx={{ marginTop: "10%", marginBottom: "100%" }}>
      <Typography variant="h4" gutterBottom>
        <center>Quản lý đơn hàng</center>
      </Typography>

      {loading ? (
        <>
          <center>
            <HandleLoading />
          </center>
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Người đặt</TableCell>
                <TableCell>SĐT</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  {console.log(order)}
                  <TableCell>{order.name || "N/A"}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(order)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(order._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                    component="a"
                      variant="outlined"
                      size="small"
                      href={`orders/${order._id}`}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Không có đơn hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={editDialog.open} onClose={handleCloseEdit} fullWidth>
        <DialogTitle>Cập nhật đơn hàng</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên người đặt"
            name="name"
            value={editDialog.order?.name || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            name="phoneNumber"
            value={editDialog.order?.phoneNumber || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Địa chỉ"
            name="address"
            value={editDialog.order?.address || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Trạng thái"
            name="status"
            select
            value={editDialog.order?.status || ""}
            onChange={handleEditChange}
            fullWidth
          >
            <MenuItem value="pending">Chờ xử lý</MenuItem>
            <MenuItem value="confirmed">Xác nhận xử lý</MenuItem>
            <MenuItem value="shipping">Đang giao</MenuItem>
            <MenuItem value="completed">Hoàn tất</MenuItem>
            <MenuItem value="cancelled">Đã hủy</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Hủy</Button>
          <Button onClick={handleSubmitEdit} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      <NotifyContainer />
    </Container>
  );
}
