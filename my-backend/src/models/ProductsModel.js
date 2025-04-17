const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "Products"
var ProductsSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    category:{
        type: String,
        ref: 'Categories'
    },
    brand: {
        type: String,
        ref: 'Brands'
    },
    images: [String],
    quantity: Number,
    warranty: Number,
    show: Boolean,
});

ProductsSchema.index({ name: 'text', description: 'text' });
var ProductModel = mongoose.model('Products', ProductsSchema);

module.exports = ProductModel;