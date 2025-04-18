var mongoose = require("mongoose");
var Products = require("../models/ProductsModel");
var Categories = require("../models/CategoriesModel");
var Brands = require("../models/BrandsModel");
var OrdersDetail = require("../models/OrdersDetailModel");

class ProductsController {
  // Read
  // Lấy tất cả sản phẩm (có populate danh mục + thương hiệu nếu có ref)
  async getAll(req, res) {
    try {
      const products = await Products.find({ show: true })
        .populate("category")
        .populate("brand");

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  }

  async getTrash(req, res) {
    try {
      const products = await Products.find({ show: false })
        .populate("category")
        .populate("brand");

      return res.status(200).json(products);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error fetching products", error });
    }
  }

  // Lấy chi tiết 1 sản phẩm
  async getById(req, res) {
    try {
      const product = await Products.findById(req.params.id)
        .populate("category")
        .populate("brand");

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  }

  // Create
  async addProduct(req, res) {
    try {
      const { name, description, price, category, brand, images, quantity, warranty } = req.body;

      if (!name || !price || !category || !images || !description || !brand || !quantity || !warranty) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      var id = await new mongoose.Types.ObjectId().toString();

      var product = new Products({
        _id: id,
        name,
        description,
        price,
        category,
        brand,
        images,
        quantity, 
        warranty,
        show: true,
      });

      await product.save();

      return res.json({ message: "Add product successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update
  async updateProduct(req, res) {
    try {
      var product = await Products.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { name, description, price, category, brand, images, quantity, warranty } = req.body;
      
      if (!name || !price || !category || !images || !description || !brand || !quantity || !warranty) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.brand = brand;
      product.images = images;
      product.quantity = quantity;
      product.warranty = warranty;
      product.show = true;

      await product.save();
      return res.json({ message: "Update product successfully"});
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error"});
    }
  }

  // Delete (Soft delete) & Destroy
  async deleteProduct(req, res) {
    try {
      const product = await Products.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.show = false;
      await product.save();

      return res.json({
        message: "Product hidden (soft deleted) successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error"});
    }
  }

  async destroyProduct(req, res) {
    try {
      const id = req.params.id || "";

      const ordersDetail = await OrdersDetail.findOne({productId: id});
      
      if (ordersDetail != null) {
        return res.status(409).json({ message: "Can not delete because order still have products"});
      }
      const deleted = await Products.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Delete product successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error"});
    }
  }

  async restoreProduct(req, res) {
    try {
      const product = await Products.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.show = true;
      await product.save();

      return res.json({ message: "Restore product successfully" });
    }
    catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error"});
    }
  }

  async searchProduct(req, res) {
    try {
      const keyWord = req.query.q || "";
      const products = await Products.find({$text:{$search:keyWord}, show: true});

      return res.json(products);
    }
    catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error"});
    }
  }
}

module.exports = new ProductsController();
