'use client';
import Sidebar from '../../components/Sidebar';
import React, { useEffect, useState } from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import HandleLoading from '../../components/HandleLoading';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Để chờ khi kiểm tra quyền

  useEffect(() => {
    const token = Cookies.get('token');
    const userRole = Cookies.get('role');

    if (!token || userRole != 'admin') {
      router.push('/Home'); // Nếu không phải admin, redirect về Home
    } else {  
      setLoading(false); // Nếu có quyền admin, set loading thành false
    }
  }, [router]);

  if (loading) {
    return <HandleLoading/>; // Đợi khi kiểm tra quyền
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <AdminDashboard />
    </Box>
  );
}
