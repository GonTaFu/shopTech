const mongoose = require("mongoose");
const Orders = require("../models/OrdersModel");
var OrdersDetail = require("../models/OrdersDetailModel"); // cái order detail vẫn chưa được xài

class OrdersController {
  // Get all orders
  async getAllOrders(req, res) {
    try {
      // Populate accountId to get billing_name from the Accounts collection
      const orders = await Orders.find().populate("accountId", "name");

      // Map the orders to match the frontend's expected format
      const formattedOrders = orders.map((order) => ({
        _id: order._id,
        accountId: order.accountId?._id || "Unknown",
        name: order.name,
        status: order.status,
        payment: order.payment,
        phoneNumber: order.phoneNumber,
        address: order.address,
        created_at: order.createdAt,
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

  // Get order by ID
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findById(id).populate("accountId");
      const order_detail = await OrdersDetail.find({ orderId: id }).populate(
        "productId"
      );
      res.json({ order, order_detail });
    } catch (error) {
      console.error("Lỗi lấy chi tiết đơn hàng:", error);
      res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
    }
  }
  // GET /orders/account/:accountId
  async getOrdersByAccountId(req, res) {
    try {
      const { id } = req.params;
      const orders = await Orders.find({ accountId: id }); // populate nếu cần tên người dùng
      res.json(orders);
    } catch (err) {
      console.error("Error fetching orders by accountId:", err);
      res
        .status(500)
        .json({
          message: "Lỗi khi lấy danh sách đơn hàng",
          error: err.message,
        });
    }
  }

  // Create a new order
  async createOrder(req, res) {
    try {
      const {
        name,
        accountId,
        status,
        payment,
        phoneNumber,
        address,
        order_detail,
      } = req.body;
      var orderId = await new mongoose.Types.ObjectId().toString();
      var newOrder = new Orders({
        _id: orderId,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        accountId: accountId,
        payment: payment,
      });

      await newOrder.save();

      order_detail.map(async (order) => {
        var idDetail = await new mongoose.Types.ObjectId().toString();
        var newOrderDetail = new OrdersDetail({
          _id: idDetail,
          orderId: orderId,
          productId: order.id,
          quantity: order.quantity,
        });

        await newOrderDetail.save();
      });

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
      return res.status(200).json(updatedOrder);
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

  // PUT /orders/:id/cancel
  async cancelOrder(req, res) {
    try {
      const { id } = req.params;

      // Cập nhật trạng thái đơn hàng thành "cancelled"
      const updatedOrder = await Orders.findByIdAndUpdate(
        id,
        { status: "cancelled" }, // trạng thái "cancelled" cho đơn hủy
        { new: true } // trả về đơn hàng đã cập nhật
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy đơn hàng để hủy" });
      }

      res.json({
        message: "Đơn hàng đã được hủy thành công",
        order: updatedOrder,
      });
    } catch (err) {
      console.error("Error cancelling order:", err);
      res.status(500).json({
        message: "Lỗi khi hủy đơn hàng",
        error: err.message,
      });
    }
  }
}

module.exports = new OrdersController();
