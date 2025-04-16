const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Thiết lập Collection "Orders"
var OrdersSchema = new Schema(
  {
    _id: String,
    name: String,
    phoneNumber: String,
    address: String,
    accountId: {
      type: String,
      ref: "Accounts",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
      default: "pending",
    },
    payment: {
      type: String,
      enum: ["cod", "banking", "paypal"],
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

var OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;
