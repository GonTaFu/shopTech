// src/app/orderDetail/[orderId]/page.js
import OrderDetail from "../OrderDetail";
import { Typography } from "@mui/material";

// Fetch a single order by ID from the backend (server-side)
async function fetchOrderById(orderId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/orders?id=${orderId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch order: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Raw API response in fetchOrderById:", data); // Debug
    const order = Array.isArray(data) ? data[0] : data; // Handle if API returns an array
    if (!order) {
      throw new Error("Order not found in API response");
    }
    const orderIdField = order.id || order._id || "unknown"; // Fallback if id is missing
    if (!orderIdField) {
      console.warn("Order ID is missing for order:", order);
    }
    const mappedOrder = {
      OrderID: orderIdField,
      Amount: order.total_price || 0,
      Order_Date: order.order_date || new Date().toISOString(),
      Payment: order.payment || "Unknown",
      Billing_Name: order.billing_name || "Unknown",
      Status: order.status || "Unknown",
    };
    console.log("Mapped order in fetchOrderById:", mappedOrder); // Debug
    return mappedOrder;
  } catch (error) {
    throw error;
  }
}

export default async function Page({ params }) {
  console.log("Params in OrderDetail page:", params); // Debug
  const { orderId } = params;
  let order = null;
  let error = null;

  if (!orderId) {
    error = "Order ID is missing in the URL.";
  } else {
    try {
      order = await fetchOrderById(orderId);
    } catch (err) {
      error = `Failed to load order: ${err.message}. Please ensure the backend is running on http://localhost:3000 and the /api/orders?id=${orderId} endpoint is accessible.`;
    }
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  return <OrderDetail order={order} />;
}
