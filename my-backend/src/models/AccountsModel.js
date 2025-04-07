const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Thiết lập Collection "Account"
var AccountsSchema = new Schema({
    _id: String,
    name: String,
    password: String,
    phoneNumber: String,
    emailAddress: String,
    roleId: String
});

const AccountsModel = mongoose.model('Accounts', AccountsSchema);

module.exports = AccountsModel;