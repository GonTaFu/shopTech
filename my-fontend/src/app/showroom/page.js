'use client';

import Link from "next/link";
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Showroom() {
  const showrooms = [
    { id: 1, city: "Hà Nội", address: "123 Đường Láng, Đống Đa, Hà Nội", phone: "1900.1234" },
    { id: 2, city: "TP. Hồ Chí Minh", address: "456 Nguyễn Trãi, Quận 5, TP. HCM", phone: "1900.5678" },
    { id: 3, city: "Đà Nẵng", address: "789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng", phone: "1900.9012" },
  ];

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#d32f2f" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              GearVN
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/">Trang chủ</Button>
          <Button color="inherit" component={Link} href="/profile">Hồ sơ</Button>
        </Toolbar>
      </AppBar>

      {/* Showroom Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Hệ thống Showroom
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {showrooms.map((showroom) => (
            <Grid item key={showroom.id} xs={12} sm={6} md={4}>
              <Card sx={{ p: 2, boxShadow: 3, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {showroom.city}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" mt={1}>
                    Địa chỉ: {showroom.address}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Hotline: {showroom.phone}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    href={`tel:${showroom.phone}`}
                    sx={{ mt: 2, backgroundColor: "#d32f2f", '&:hover': { backgroundColor: "#b71c1c" } }}
                  >
                    Gọi ngay
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1976d2", color: "white", padding: "16px", textAlign: "center" }}>
        <Typography variant="body1">© 2025 GearVN. All rights reserved.</Typography>
      </footer>
    </>
  );
}
