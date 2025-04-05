'use client';

import Link from "next/link";
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #d32f2f 30%, #f44336 90%)', // Gradient for header
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Stronger shadow for depth
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(1, 3),
}));

const StyledButtonNav = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold',
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  transition: 'background 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle hover effect
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Subtle gradient background
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', // Soft shadow for depth
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px', // Rounded corners
  background: 'linear-gradient(145deg, #ffffff, #e6e6e6)', // Subtle gradient for cards
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)', // Slight scale on hover
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Stronger shadow on hover
  },
}));

const StyledButtonCall = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  background: 'linear-gradient(90deg, #d32f2f 30%, #f44336 90%)', // Gradient button
  color: '#fff',
  fontWeight: 'bold',
  transition: 'background 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(90deg, #b71c1c 30%, #d32f2f 90%)', // Darker gradient on hover
  },
}));

const StyledFooter = styled('footer')(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976d2 30%, #42a5f5 90%)', // Gradient for footer
  color: 'white',
  padding: theme.spacing(2),
  textAlign: 'center',
  boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.2)', // Shadow for depth
}));

export default function ShowroomPage() {
  const showrooms = [
    { id: 1, city: "Hà Nội", address: "123 Đường Láng, Đống Đa, Hà Nội", phone: "1900.1234" },
    { id: 2, city: "TP. Hồ Chí Minh", address: "456 Nguyễn Trãi, Quận 5, TP. HCM", phone: "1900.5678" },
    { id: 3, city: "Đà Nẵng", address: "789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng", phone: "1900.9012" },
  ];

  return (
    <>
      {/* Header */}
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: "bold",
              letterSpacing: '1px',
              background: 'linear-gradient(to right, #fff, #e0e0e0)', // Gradient text
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              GearVN
            </Link>
          </Typography>
          <StyledButtonNav component={Link} href="/">
            Trang chủ
          </StyledButtonNav>
          <StyledButtonNav component={Link} href="/profile">
            Hồ sơ
          </StyledButtonNav>
        </StyledToolbar>
      </StyledAppBar>

      {/* Showroom Section */}
      <StyledContainer>
        <Typography 
          variant="h4" 
          align="center" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ 
            color: '#1a237e', // Deep indigo color
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #1a237e, #1976d2)', // Gradient text
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            borderBottom: '2px solid #1976d2', // Underline effect
            paddingBottom: '8px',
          }}
        >
          Hệ thống Showroom
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {showrooms.map((showroom) => (
            <Grid item key={showroom.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    fontWeight="bold" 
                    sx={{ 
                      color: '#d32f2f', // Red for city name
                      fontSize: '1.3rem',
                      borderLeft: '4px solid #d32f2f',
                      paddingLeft: '12px',
                    }}
                  >
                    {showroom.city}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    mt={2} 
                    sx={{ 
                      fontSize: '1rem', 
                      color: '#424242' 
                    }}
                  >
                    Địa chỉ: {showroom.address}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: '1rem', 
                      color: '#424242' 
                    }}
                  >
                    Hotline: {showroom.phone}
                  </Typography>
                  <StyledButtonCall
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    href={`tel:${showroom.phone}`}
                  >
                    Gọi ngay
                  </StyledButtonCall>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>

      {/* Footer */}
      <StyledFooter>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: '500', 
            letterSpacing: '0.5px' 
          }}
        >
          © 2025 GearVN. All rights reserved.
        </Typography>
      </StyledFooter>
    </>
  );
}