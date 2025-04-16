"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import OrderHistory from "../../components/OrderHistory";
import Cookies from "js-cookie";
import API from "../../utils/api";

import HandleLoading from '../../components/HandleLoading';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

  const accountId = typeof window !== "undefined" ? Cookies.get("userID") : null;

  const fetchOrdersByAccount = async () => {
    try {
      const res = await API.get(`/orders/account/${accountId}`);

      setOrders(res.data);
    } catch (err) {
      console.log("Lỗi khi load lịch sử đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountId) {
        fetchOrdersByAccount();
    }
    else {
        router.push("/")
    }

  }, [accountId]);

  if (loading) {
    return <HandleLoading/>
  }

    return <OrderHistory orders={orders} fetchOrdersByAccount={fetchOrdersByAccount} />;
}