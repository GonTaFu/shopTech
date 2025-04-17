import { useEffect, useState } from "react";
import {
  Container, Pagination, Typography, Card, CardContent, CardActions, Button,
  Divider, Box
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";

import API from "../utils/api";
import { notifySuccess, notifyError } from "../utils/notify"; // Import notify functions

export default function OrderHistory({ orders, fetchOrdersByAccount }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  

  // Hàm chuyển trang
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  
  // Hàm hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await API.put(`/orders/${orderId}/cancel`);
      notifySuccess(res.data.message); // Thông báo thành công
      // Tải lại lịch sử đơn hàng sau khi hủy
      fetchOrdersByAccount(); 
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      notifyError("Không thể hủy đơn hàng"); // Thông báo lỗi
    }
  };

  // Chia đơn hàng theo trang
  const startIndex = (page - 1) * itemsPerPage;
  const displayedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container maxWidth="md" sx={{ mt: 4, marginBottom: "100%" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
      Order History
      </Typography>
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={12}>
        {displayedOrders.map((order) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={order._id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  #{order._id}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="body2" noWrap="true">{new Date(order.createdAt).toLocaleString()}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocalShippingIcon color="action" />
                  <Typography variant="body2">Status: <strong>{order.status}</strong></Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <PaymentIcon color="action" />
                  <Typography variant="body2">Payment: {order.payment}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="action" />
                  <Typography variant="body2" noWrap="true">{order.name}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                {/* Nút xem chi tiết */}
                <Button component="a" href={`/orders/${order._id}`} size="small" variant="outlined" color="primary">
                  View Details
                </Button>
                {/* Nút hủy đơn hàng */}
                {order.status !== "completed" && order.status !== "shipping" && order.status !== "cancelled" && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}
                {order.status === "cancelled" && (
                  <Typography variant="body2" color="textSecondary">
                    Order Cancelled
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(orders.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}
