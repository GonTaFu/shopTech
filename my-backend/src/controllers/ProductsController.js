var mongoose = require("mongoose");
var Products = require("../models/ProductsModel");
var Categories = require("../models/CategoriesModel");
var Brands = require("../models/BrandsModel");

class ProductsController {
  // Read
  // Lấy tất cả sản phẩm (có populate danh mục + thương hiệu nếu có ref)
  async getAll(req, res) {
    try {
      const products = await Products.find()
        .populate("category")
        .populate("brand");

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
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
      const { name, description, price, categories_id, brand, images } =
        req.body;

      if (
        !name ||
        !price ||
        !categories_id ||
        !images ||
        !description ||
        !brand
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      var id = await new mongoose.Types.ObjectId().toString();

      var product = new Products({
        _id: id,
        name,
        description,
        price,
        categories_id,
        brand,
        images,
        show: true,
      });

      await product.save();

      return res.json({ message: "Add product successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Update
  async updateProduct(req, res) {
    try {
      var product = await Products.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { name, description, price, categories_id, brand, images, show } =
        req.body;

      product.name = name;
      product.description = description;
      product.price = price;
      product.categories_id = categories_id;
      product.brand = brand;
      product.images = images;
      product.show = show;

      await product.save();
      return res.json({ message: "Update product successfully", product });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", detail: error.message });
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
    
        return res.json({ message: "Product hidden (soft deleted) successfully" });
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", detail: error.message });
      }
  }
  
  async destroyProduct(req, res) {
    try {
      const deleted = await Products.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Delete product successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", detail: error.message });
    }
  }
}

module.exports = new ProductsController();
