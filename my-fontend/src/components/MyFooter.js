"use client";
import * as React from "react";
import { Container, Box, Typography, Link, Divider } from "@mui/material";

const MyFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgb(15,17,26)",
        color: "white",
        py: 4,
        px: 2,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ShopTech
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover">
              About
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Services
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: "gray" }} />

        <Typography variant="body2" textAlign="center">
          © {new Date().getFullYear()} Shop Tech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default MyFooter;