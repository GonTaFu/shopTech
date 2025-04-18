'use client';
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { alpha, styled } from "@mui/material/styles";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Typography } from "@mui/material";

import SearchBoxInput from "./SearchBoxInput";

const StyledToolBar = styled(ToolBar)(({ theme }) => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function MyAppBar() {
  const [open, setOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    const updateUserName = () => {
      const name = Cookies.get("userName");
      if (name) setUserName(name);
    };

    setIsClient(true);
    updateUserName(); // chạy lần đầu

    window.addEventListener("user-login", updateUserName); // lắng nghe sự kiện

    return () => {
      window.removeEventListener("user-login", updateUserName);
    };
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('userID');
    Cookies.remove('role');
    setUserName('');
    router.push('/account');
  };

  const handleRouter = (path = "") => {
    console.log(path)
    router.push(path);
    return;
  }

  if (!isClient) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      // position="static"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 4
      }}
    >
      <Container maxWidth="lg">
        <StyledToolBar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button href="/" variant="text" color="info" startIcon={<StoreMallDirectoryIcon/>}>Home</Button>
              <Button href="/products" variant="text" color="info" startIcon={<LaptopChromebookIcon/>}>Products</Button>
              <Button href="/cart" variant="text" color="info" startIcon={<LocalMallIcon/>}>Cart</Button>
              <Button href="/orders" variant="text" color="info" startIcon={<AssignmentSharpIcon/>}>Orders</Button>
              {/* <Button variant="text" color="info" sx={{ minWidth: 0 }}>FAQ</Button>
              <Button variant="text" color="info" sx={{ minWidth: 0 }}>Blog</Button> */}
            </Box>
            <SearchBoxInput/>
          </Box>

          {/* Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {userName ? (
              <>
                <Box sx={{ mr: 2, color: "black" }}>
                <Button href="/profile" variant="text" color="black" startIcon={<AccountCircleSharpIcon/>}>
                  <Typography>Xin chào, {userName}</Typography>
                </Button>
                </Box>
                <Button color="error" variant="text" size="small" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button color="primary" variant="text" size="small" href="/account">Sign in</Button>
                <Button color="primary" variant="contained" size="small" href="/account/register">Sign up</Button>
              </>
            )}
          </Box>

          {/* Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: { top: 'var(--template-frame-height, 0px)' },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button href="/products" variant="text" color="info" fullWidth startIcon={<StoreMallDirectoryIcon/>}>
                    Home
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button href="/products" variant="text" color="info" fullWidth startIcon={<LaptopChromebookIcon/>}>
                    Products
                  </Button>
                </MenuItem>
                <MenuItem>
                <Button href="/cart" variant="text" color="info" fullWidth startIcon={<LocalMallIcon/>}>Cart</Button>
                </MenuItem>
                <MenuItem>
                <Button href="/orders" variant="text" color="info" fullWidth startIcon={<AssignmentSharpIcon/>}>Orders</Button>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {userName ? (
                  <>
                    <MenuItem>
                    <Button href="/profile" variant="text" color="black" fullWidth startIcon={<AccountCircleSharpIcon/>}>
                      <Typography>Xin chào, {userName}</Typography>
                    </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="error" variant="outlined" fullWidth onClick={handleLogout}>
                        Đăng xuất
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth href="/account/register">
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth href="/account">
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolBar>
      </Container>
    </AppBar>
  );
}
