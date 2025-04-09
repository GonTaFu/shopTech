var express = require("express");
var router = express.Router();

var productssController = require("../controllers/ProductsController");
var categoriesController = require("../controllers/CategoriesController");
var brandsController = require("../controllers/BrandsControllers");
var accountsController = require("../controllers/AccountsController");
var ordersController = require("../controllers/OrdersController");
var ordersDetailController = require("../controllers/OrdersDetailController");

// Categories
// Add - Create
router.post("/categories", categoriesController.createCategory); // Changed from "/categories/add" and "AddCatagory"
// Update
router.put("/categories/:id", categoriesController.updateCategory); // Matches "updateCategory"
// Delete
router.delete("/categories/:id", categoriesController.deleteCategory); // Matches "deleteCategory"
// Get - Read
router.get("/categories", categoriesController.getAllCategories); // Changed from "GetCategories"
router.get("/categories/:id", categoriesController.getCategoryById); // Added to match "getCategoryById"

// Keep the root route
router.get("/", (req, res) => {
  return res.json({ message: "This is API" });
});

// Uncomment and update product routes if needed
// Products
// router.post("/products/add", productssController.AddProducts);
// router.put("/products/update/:id", productssController.UpdateProducts);
// router.delete("/products/delete/:id", productssController.DeleteProducts);
// router.get("/products", productssController.GetProducts);

module.exports = router;
