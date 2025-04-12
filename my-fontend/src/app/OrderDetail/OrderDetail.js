"use client";
// src/app/orderDetail/OrderDetail.js
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRouter } from "next/navigation";

export default function OrderDetail({ order }) {
  const router = useRouter();

  // Precompute the initial formatted date for server rendering
  const initialFormattedDate =
    order && order.Order_Date
      ? new Date(order.Order_Date).toString() !== "Invalid Date"
        ? new Date(order.Order_Date).toISOString() // Temporary for server render
        : "N/A"
      : "N/A";

  const [formattedDate, setFormattedDate] = useState(initialFormattedDate);

  useEffect(() => {
    if (order && order.Order_Date) {
      const date = new Date(order.Order_Date);
      if (!isNaN(date.getTime())) {
        // Format the date on the client with the user's locale
        setFormattedDate(date.toLocaleDateString());
      } else {
        setFormattedDate("N/A");
      }
    } else {
      setFormattedDate("N/A");
    }
  }, [order]);

  const handleBack = () => {
    router.push("/OrderManagement");
  };

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, marginBottom: "10%" }}>
        <Typography variant="h6" color="error" textAlign="center">
          Order not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, marginBottom: "10%" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📦 Order Details
      </Typography>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            #{order.OrderID} - {order.Billing_Name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocalShippingIcon color="action" />
            <Typography variant="body1">
              Status: <strong>{order.Status}</strong>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <PaymentIcon color="action" />
            <Typography variant="body1">Payment: {order.Payment}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <PersonIcon color="action" />
            <Typography variant="body1">
              Total: <strong>${order.Amount}</strong>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CalendarTodayIcon color="action" />
            <Typography variant="body1">Order Date: {formattedDate}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleBack}>
            Back to Order History
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
