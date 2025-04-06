import { useState } from "react";
import {
  Container, Pagination, Typography, Card, CardContent, CardActions, Button,
  Divider, Box
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";



export default function OrderHistory({ orders }) {
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
