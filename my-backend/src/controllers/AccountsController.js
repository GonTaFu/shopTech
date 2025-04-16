const mongoose = require("mongoose");
const Accounts = require("../models/AccountsModel");
const jwt = require("../utils/jwt");

class AccountController {
  // Lấy tất cả tài khoản
  async getAll(req, res) {
    try {
      const accounts = await Accounts.find();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching accounts", error });
    }
  }

  // Lấy tài khoản theo ID
  async getById(req, res) {
    try {
      const account = await Accounts.findById(req.params.id);
      if (!account)
        return res.status(404).json({ message: "Account not found" });

      res.json(account);
    } catch (error) {
      res.status(500).json({ message: "Error fetching account", error });
    }
  }

  // Thêm tài khoản
  async addAccount(req, res) {
    try {
      const { name, password, phoneNumber, emailAddress, roleId } = req.body;

      if (!name || !password || !phoneNumber || !emailAddress || !roleId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const id = new mongoose.Types.ObjectId().toString();

      const account = new Accounts({
        _id: id,
        name,
        password,
        phoneNumber,
        emailAddress,
        roleId,
      });

      await account.save();

      return res.json({ message: "Add account successfully", account });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Cập nhật tài khoản
  async updateAccount(req, res) {
    try {
      const account = await Accounts.findById(req.params.id);
      if (!account)
        return res.status(404).json({ message: "Account not found" });

      const { name, password, phoneNumber, emailAddress, roleId } = req.body;

      account.name = name;
      account.password = password;
      account.phoneNumber = phoneNumber;
      account.emailAddress = emailAddress;
      account.roleId = roleId;

      await account.save();
      return res.json({ message: "Update account successfully", account });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", detail: error.message });
    }
  }

  // Xóa tài khoản
  async deleteAccount(req, res) {
    try {
      const deleted = await Accounts.findByIdAndDelete(req.params.id);
      if (!deleted)
        return res.status(404).json({ message: "Account not found" });

      return res.json({ message: "Delete account successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", detail: error.message });
    }
  }

  async login(req, res) {
    const { emailAddress, password } = req.body;
    try {
      const account = await Accounts.findOne({ emailAddress, password });
      if (!account)
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
      const token = jwt.generateToken({ id: account._id, role: account.roleId });
  
      return res.json({
        token,
        role: account.roleId,
        fullName: account.name,
        id: account._id,
      });
    } catch (error) {
      return res.status(500).json({ message: "Đăng nhập thất bại", error });
    }
  }
}

module.exports = new AccountController();
