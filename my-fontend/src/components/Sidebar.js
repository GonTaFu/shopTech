'use client';

import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100vh',
  bgcolor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const Sidebar = () => {
  const router = useRouter();

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h2>Admin Panel</h2>
      </SidebarHeader>
      <Divider sx={{ borderColor: 'white' }} />
      <List sx={{ marginTop: 2 }}>
        <ListItem button onClick={() => router.push('/admin')} sx={{ '&:hover': { bgcolor: 'primary.dark' } }}>
          <IconButton sx={{ color: 'white', marginRight: 2 }}>
            <HomeIcon />
          </IconButton>
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button onClick={() => router.push('/admin/products')} sx={{ '&:hover': { bgcolor: 'primary.dark' } }}>
          <IconButton sx={{ color: 'white', marginRight: 2 }}>
            <ShoppingCartIcon />
          </IconButton>
          <ListItemText primary="Manage Products" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button onClick={() => router.push('/admin/userManagement')} sx={{ '&:hover': { bgcolor: 'primary.dark' } }}>
          <IconButton sx={{ color: 'white', marginRight: 2 }}>
            <PeopleIcon />
          </IconButton>
          <ListItemText primary="Manage Users" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
