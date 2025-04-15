const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Thiết lập Collection "Orders"
var OrdersSchema = new Schema({
  _id: String,
  name: String,
  phoneNumber: String,
  address: String,
  accountId: {
    type: String,
    ref: "Accounts",
  },
  status: String,
  payment: String,
  created_at: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

var OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;
