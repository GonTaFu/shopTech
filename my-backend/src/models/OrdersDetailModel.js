const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "OrdersDetail"

var OrdersDetailSchema = new Schema({
    _id: String,
    orderId: {
        type: String,
        ref: 'Orders'
    },
    productId: {
        type: String,
        ref: 'Products'
    },
    quantity: Number
});

const OrdersDetailModel = mongoose.model('OrdersDetail', OrdersDetailSchema);

module.exports = OrdersDetailModel;