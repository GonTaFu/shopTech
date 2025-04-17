var mongoose = require("mongoose");
var Brand = require("../models/BrandsModel");
var Product = require("../models/ProductsModel");

class BrandsController {
  // [GET] /brands - Lấy tất cả brand
  async getAll(req, res) {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // [GET] /brands/:id - Lấy 1 brand theo ID
  async getById(req, res) {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand)
        return res.status(404).json({ message: "Không tìm thấy Brand" });
      res.json(brand);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // [POST] /brands - Tạo mới brand
  async create(req, res) {
    try {
      const name = req.body.name;   
      const _id = await new mongoose.Types.ObjectId().toString();

      const newBrand = new Brand({ _id, name });

      await newBrand.save();

      res.status(201).json(newBrand);
    } catch (err) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }

  // [PUT] /brands/:id - Cập nhật brand
  async update(req, res) {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBrand)
        return res
          .status(404)
          .json({ message: "Không tìm thấy Brand để cập nhật" });
      res.json(updatedBrand);
    } catch (err) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }

  // [DELETE] /brands/:id - Xoá brand
  async delete(req, res) {
    try {
      const id = req.params.id || "";

      const product = await Product.findOne({brand: id});
      if (product != null) {
        return res.status(409).json({ error: "Không thể xóa do vẫn còn sản phẩm chứa brand này"});
      }

      const deletedBrand = await Brand.findByIdAndDelete(id);

      if (!deletedBrand)
        return res.status(404).json({ message: "Không tìm thấy Brand để xoá" });
      res.json({ message: "Đã xoá brand thành công" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error"});
    }
  }
}

module.exports = new BrandsController();
