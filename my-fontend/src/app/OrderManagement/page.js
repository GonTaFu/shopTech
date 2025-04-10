"use client";
import OrderHistory from "./OrderHistory";
import { Typography } from "@mui/material";

// Fetch orders from the backend (server-side)
async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch orders: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.map((order) => ({
      OrderID: order._id,
      Amount: order.total_price,
      Order_Date: order.order_date,
      Payment: order.payment,
      Billing_Name: order.billing_name,
      Status: order.status,
    }));
  } catch (error) {
    throw error;
  }
}

export default async function Page() {
  let orders = [];
  let error = null;

  try {
    orders = await fetchOrders();
  } catch (err) {
    error = `Failed to load orders: ${err.message}. Please ensure the backend is running on http://localhost:3000 and the /api/orders endpoint is accessible.`;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography variant="h6" textAlign="center">
        No orders found.
      </Typography>
    );
  }

  return <OrderHistory orders={orders} />;
}
