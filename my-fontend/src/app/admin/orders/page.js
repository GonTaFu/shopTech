"use client"
import * as React from 'react';

import OrderManagementPage from '../../../components/OrderManagementPage';
import SideBar from "../../../components/Sidebar";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import HandleLoading from '../../../components/HandleLoading';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Để chờ khi kiểm tra quyền
  
    useEffect(() => {
      const token = Cookies.get('token');
      const userRole = Cookies.get('role');
  
      if (!token || userRole !== 'admin') {
        router.push('/'); // Nếu không phải admin, redirect về Home
      } else {  
        setLoading(false); // Nếu có quyền admin, set loading thành false
      }
    }, [router]);
  
    if (loading) {
      return <HandleLoading/>; // Đợi khi kiểm tra quyền
    }

    return (
        <div>
          <SideBar/>
          <OrderManagementPage/>
        </div>
    );
}