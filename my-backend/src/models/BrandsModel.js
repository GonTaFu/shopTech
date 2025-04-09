const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "Brands"
var BrandsSchema = new Schema({
    _id: String,
    name: String,
});

var BrandsModel = mongoose.model("Brands", BrandsSchema);

module.exports = BrandsModel;
