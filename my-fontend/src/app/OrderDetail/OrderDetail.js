"use client";
// src/app/orderDetail/OrderDetail.js
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Stack,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRouter } from "next/navigation";

export default function OrderDetail({ order }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/OrderManagement");
  };

  if (!order) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6, mb: 8 }}>
        <Typography variant="h6" color="error" align="center">
          ❌ Order not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 10 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        📦 Order Details
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            #{order.OrderID} — {order.Billing_Name}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <InfoRow
              icon={<LocalShippingIcon color="info" />}
              label="Status"
              value={order.Status}
            />
            <InfoRow
              icon={<PaymentIcon color="success" />}
              label="Payment"
              value={order.Payment}
            />
            <InfoRow
              icon={<PersonIcon color="action" />}
              label="Total"
              value={`$${order.Amount}`}
            />
            <InfoRow
              icon={<CalendarTodayIcon color="warning" />}
              label="Order Date"
              value={new Date(order.Order_Date).toLocaleDateString()}
            />
          </Stack>
        </CardContent>

        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleBack}>
            ⬅ Back to Orders
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

// Helper component for better reuse and layout
function InfoRow({ icon, label, value }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography variant="body1">
        {label}: <strong>{value}</strong>
      </Typography>
    </Box>
  );
}
