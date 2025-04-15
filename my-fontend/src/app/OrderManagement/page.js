// src/app/orderHistory/page.js
import OrderHistory from "./OrderHistory";
import { Typography } from "@mui/material";

// Fetch orders from the backend (server-side)
async function fetchOrders() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch orders: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Raw API response in fetchOrders:", data); // Debug
    const mappedOrders = data.map((order, index) => {
      const orderId = order.id || order._id || `fallback-${index}`; // Fallback if id is missing
      if (!orderId) {
        console.warn("Order ID is missing for order:", order);
      }
      return {
        OrderID: orderId,
        Amount: order.total_price || 0,
        Order_Date: order.order_date || new Date().toISOString(),
        Payment: order.payment || "Unknown",
        Billing_Name: order.billing_name || "Unknown",
        Status: order.status || "Unknown",
      };
    });
    console.log("Mapped orders in fetchOrders:", mappedOrders); // Debug
    return mappedOrders;
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
    error = `Failed to load orders: ${err.message}. Please ensure the backend is running on ${process.env.NEXT_PUBLIC_API_URL} and the /api/orders endpoint is accessible.`;
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
