'use client';
import Sidebar from '../../components/Sidebar';
import React, { useEffect } from 'react'; // ✅ Đảm bảo import useEffect
import AdminDashboard from '../../components/AdminDashboard';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const userRole = Cookies.get('role');

    if (!token || userRole !== 'admin') {
      router.push('/Home');
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <AdminDashboard />
    </Box>
  );
}
