const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "Categories"
var CategoriesSchema = new Schema({
    _id: String,
    name: String,
});

var CategoriesModel = mongoose.model("Categories", CategoriesSchema);

module.exports = CategoriesModel;
