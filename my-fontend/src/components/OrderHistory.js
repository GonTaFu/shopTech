import { useState } from "react";
import {
  Container, Pagination, Typography, Card, CardContent, CardActions, Button,
  Divider, Box
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";

const orders = [
  { OrderID: 1001, Amount: 2598, Order_Date: "2024-03-01", Payment: "Credit Card", Billing_Name: "John Doe", Status: "Delivered" },
  { OrderID: 1002, Amount: 1698, Order_Date: "2024-03-05", Payment: "PayPal", Billing_Name: "Jane Smith", Status: "Delivered" },
  { OrderID: 1003, Amount: 205, Order_Date: "2024-03-10", Payment: "Credit Card", Billing_Name: "Michael Johnson", Status: "Shipped" },
  { OrderID: 1004, Amount: 2099, Order_Date: "2024-03-15", Payment: "Apple Pay", Billing_Name: "Emily Davis", Status: "Processing" },
  { OrderID: 1005, Amount: 2249, Order_Date: "2024-03-20", Payment: "Credit Card", Billing_Name: "David Brown", Status: "Delivered" },
  { OrderID: 1006, Amount: 1500, Order_Date: "2024-03-22", Payment: "PayPal", Billing_Name: "Sophia Wilson", Status: "Pending" },
  { OrderID: 1007, Amount: 3200, Order_Date: "2024-03-25", Payment: "Credit Card", Billing_Name: "Daniel Martinez", Status: "Delivered" },
  { OrderID: 1008, Amount: 1100, Order_Date: "2024-03-28", Payment: "Apple Pay", Billing_Name: "Olivia Taylor", Status: "Shipped" },
  { OrderID: 1009, Amount: 850, Order_Date: "2024-03-30", Payment: "Credit Card", Billing_Name: "James Anderson", Status: "Processing" },
  { OrderID: 1010, Amount: 500, Order_Date: "2024-03-31", Payment: "PayPal", Billing_Name: "Emma Thomas", Status: "Pending" }
];

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const displayedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container maxWidth="md" sx={{ mt: 4, marginBottom: "10%"}}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🛒 Order History
      </Typography>
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={12}>
        {displayedOrders.map((order) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={order.OrderID}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  #{order.OrderID} - {order.Billing_Name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocalShippingIcon color="action" />
                  <Typography variant="body2">Status: <strong>{order.Status}</strong></Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <PaymentIcon color="action" />
                  <Typography variant="body2">Payment: {order.Payment}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon color="action" />
                  <Typography variant="body2">Total: <strong>${order.Amount}</strong></Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button size="small" variant="outlined" color="primary">
                  View Details
                </Button>
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
