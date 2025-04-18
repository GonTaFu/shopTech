var mongoose = require("mongoose");
var Categories = require("../models/CategoriesModel");
const { v4: uuidv4 } = require("uuid"); // For generating unique string IDs
const Products = require("../models/ProductsModel"); // Assuming you have a ProductsModel

class CategoriesController {
  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await Categories.find().select("_id name"); // Only return _id and name
      return res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving categories",
        error: error.message,
      });
    }
  }

  // Get a single category by ID
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await Categories.findById(id).select("_id name");

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving category",
        error: error.message,
      });
    }
  }

  // Create a new category
  async createCategory(req, res) {
    try {
      const { name } = req.body;

      // Validate input
      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Category name is required and must be a non-empty string",
        });
      }

      // Check for duplicate category name
      const existingCategory = await Categories.findOne({ name: name.trim() });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }

      // Create new category
      const newCategory = new Categories({
        _id: uuidv4(), // Generate a unique string ID
        name: name.trim(),
      });

      const savedCategory = await newCategory.save();

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: savedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating category",
        error: error.message,
      });
    }
  }

  // Update a category by ID
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Validate input
      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Category name is required and must be a non-empty string",
        });
      }

      // Check for duplicate category name (excluding the current category)
      const existingCategory = await Categories.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }

      // Update the category
      const updatedCategory = await Categories.findByIdAndUpdate(
        id,
        { name: name.trim() },
        { new: true, runValidators: true }
      ).select("_id name");

      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating category",
        error: error.message,
      });
    }
  }

  // Delete a category by ID
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Check if the category is referenced by any products
      const productsUsingCategory = await Products.findOne({ category: id });
      if (productsUsingCategory) {
        return res.status(400).json({
          success: false,
          message:
            "Không thể xóa do vẫn còn sản phẩm chứa category này",
        });
      }

      // Delete the category
      const deletedCategory = await Categories.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error deleting category",
        error: error.message,
      });
    }
  }
}

module.exports = new CategoriesController();
