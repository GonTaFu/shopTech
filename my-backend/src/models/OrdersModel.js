const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Thiết lập Collection "Orders"
var OrdersSchema = new Schema({
  _id: String,
  accountId: {
    type: String,
    ref: "Accounts",
  },
  total_price: Number,
  status: String,
});

var OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;
