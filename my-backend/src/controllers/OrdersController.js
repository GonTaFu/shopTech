const mongoose = require("mongoose");
const Orders = require("../models/OrdersModel");
var OrdersDetail = require('../models/OrdersDetailModel'); // cái order detail vẫn chưa được xài

class OrdersController {
  // Get all orders
  async getAllOrders(req, res) {
    try {
      // Populate accountId to get billing_name from the Accounts collection
      const orders = await Orders.find()
        .populate("accountId", "name") // Assuming 'name' is the field in Accounts collection
        .exec();

      // Map the orders to match the frontend's expected format
      const formattedOrders = orders.map((order) => ({
        _id: order._id,
        accountId: order.accountId?._id || "Unknown",
        total_price: order.total_price,
        status: order.status,
        order_date: "N/A", // Fallback since not in schema
        payment: "N/A", // Fallback since not in schema
        billing_name: order.accountId?.name || "Unknown", // Get from populated accountId
      }));

      return res.status(200).json(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching orders",
        error: error.message,
      });
    }
  }

  // Create a new order
  async createOrder(req, res) {
    try {
      const {name, accountId, status, payment, phoneNumber, address, order_detail} = req.body;
      var id = await new mongoose.Types.ObjectId().toString();
      var newOrder = new Orders({
        _id: id,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        accountId: accountId,
        status: status,
        payment: payment,
      });

      await newOrder.save();

      order_detail.map(async (order) => {
        var idDetail =  await new mongoose.Types.ObjectId().toString();
        var newOrderDetail = new OrdersDetail({
          _id: idDetail,
          orderId: id,
          productId: order.id,
          quantity: order.quantity,
        });

        await newOrderDetail.save();
      })
      return res.json({ message: "Add product successfully" });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating order",
        error: error.message,
      });
    }
  }

  // Update an order by ID
  async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updatedOrder = await Orders.findByIdAndUpdate(orderId, req.body, {
        new: true,
      })
        .populate("accountId", "name")
        .exec();
      if (!updatedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      return res.status(200).json({
        _id: updatedOrder._id,
        accountId: updatedOrder.accountId?._id || "Unknown",
        total_price: updatedOrder.total_price,
        status: updatedOrder.status,
        order_date: "N/A",
        payment: "N/A",
        billing_name: updatedOrder.accountId?.name || "Unknown",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({
        success: false,
        message: "Error updating order",
        error: error.message,
      });
    }
  }

  // Delete an order by ID
  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Orders.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      return res.status(200).json({ success: true, message: "Order deleted" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({
        success: false,
        message: "Error deleting order",
        error: error.message,
      });
    }
  }
}

module.exports = new OrdersController();
