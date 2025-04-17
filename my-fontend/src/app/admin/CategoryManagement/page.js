"use client";
import Head from "next/head";
import CategoryManagement from "../../../components/CategoryManagement";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import HandleLoading from '../../../components/HandleLoading';

export default function CategoryPage() {
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
      <Head>
        <title>Category Management Page</title>
      </Head>

      <h1>Category Management</h1>
      <CategoryManagement />

      <style jsx>{`
        h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          color: #1a237e;
        }
      `}</style>
    </div>
  );
}
