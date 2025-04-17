'use client';
import Image from "next/image";
import AdminUserManagement  from "../../../components/UserManagement";
import { Container } from "@mui/material";
import SideBar from "../../../components/Sidebar";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import HandleLoading from '../../../components/HandleLoading';

export default function UserManagementPage() {
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
            <SideBar></SideBar>

            <AdminUserManagement></AdminUserManagement>
            <style jsx>{`
            h1 {
                align-items: center;
                justify-content: center;
                display: flex;
                },
                `}</style>
        </div>
    );
}
