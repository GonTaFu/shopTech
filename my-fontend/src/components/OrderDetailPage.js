"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Table, TableBody, TableRow, TableCell, TableHead, Paper, TableContainer } from "@mui/material";
import API from "../utils/api";
import HandleLoading from "./HandleLoading";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.order);
        setDetails(res.data.order_detail);
        console.log("RES: ", res);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <center>
        <HandleLoading />
      </center>
    );
  }

  if (!order) {
    return <Typography>Không tìm thấy đơn hàng</Typography>;
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

      <Typography variant="h6" mt={4}>
        Sản phẩm đã đặt
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.productId?.name || "Không rõ"}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
