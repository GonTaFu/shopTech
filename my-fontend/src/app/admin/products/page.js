"use client"
// src/app/admin/products/page.js
import { Container } from "@mui/material";
import ProductsManager from "../../../components/ProductsManager";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import HandleLoading from '../../../components/HandleLoading';
  

export default function Home() {
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
      <Container sx={{marginBottom: "20%"}}>
        <ProductsManager></ProductsManager>
      </Container>
    );
  }
  