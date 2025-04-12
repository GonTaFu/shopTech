'use client';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import AdminDashboard from '../../components/AdminDashboard';
import { Box } from '@mui/material';

const AdminPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <AdminDashboard />
    </Box>
  );
};

export default AdminPage;
