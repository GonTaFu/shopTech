"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Sử dụng useParams từ next/navigation
import { Container, Typography, Table, TableBody, TableRow, TableCell, TableHead, Paper, TableContainer } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import API from "../utils/api"; // Import API helper
import HandleLoading from "./HandleLoading";

export default function OrderDetailCustomerPage({ accountId }) {
  const { id } = useParams(); // Lấy id từ URL
  const [order, setOrder] = useState(null);
  const [details, setDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch thông tin chi tiết đơn hàng từ API
  useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        try {
          const res = await API.get(`/orders/${id}`);
          setOrder(res.data.order);
          setDetails(res.data.order_detail);
          setTotal(res.data.total);
        } catch (err) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetail();
    }
  }, [id]);

  if (loading) {
    return <HandleLoading />;
  }

  if (!details) {
    return <div>Không tìm thấy đơn hàng.</div>;
  }

  return (
    <Container sx={{ marginTop: "5%", marginBottom: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Chi tiết đơn hàng
      </Typography>

      <Typography variant="subtitle1">Người đặt: {order.name}</Typography>
      <Typography variant="subtitle1">Số điện thoại: {order.phoneNumber}</Typography>
      <Typography variant="subtitle1">Địa chỉ: {order.address}</Typography>
      <Typography variant="subtitle1">Trạng thái: {order.status}</Typography>
      <Typography variant="subtitle1">Phương thức thanh toán: {order.payment}</Typography>
      <Typography variant="subtitle1">Tổng tiền: {total.toLocaleString()} VND</Typography>

      <Typography variant="h6" mt={4}>
        Sản phẩm đã đặt
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.productId?.name || "Không rõ"}</TableCell>
                <TableCell>{item.productId?.price.toLocaleString() || "N/A"} VND</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
