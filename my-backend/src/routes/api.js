var express = require("express");
var router = express.Router();

var productsController = require("../controllers/ProductsController");
var categoriesController = require("../controllers/CategoriesController");
var brandsController = require("../controllers/BrandsControllers");
var accountsController = require("../controllers/AccountsController");
var ordersController = require("../controllers/OrdersController");
var ordersDetailController = require("../controllers/OrdersDetailController");


// Products
router.post("/products/add", productsController.addProduct);
router.put("/products/update/:id", productsController.updateProduct);
router.delete("/products/delete/:id", productsController.deleteProduct);
router.delete("/products/destroy/:id", productsController.destroyProduct);
router.patch("/products/restore/:id", productsController.restoreProduct);
router.get("/products/trash", productsController.getTrash);
router.get("/products/:id", productsController.getById);
router.get("/products", productsController.getAll);

// Categories
<<<<<<< HEAD
router.post("/categories", categoriesController.createCategory);
router.put("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);
router.get("/categories", categoriesController.getAllCategories);
router.get("/categories/:id", categoriesController.getCategoryById);

// Orders
router.get("/orders", ordersController.getAllOrders);
router.post("/orders", ordersController.createOrder);
router.put("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);
=======
// Add - Create
router.post("/categories", categoriesController.createCategory); // Changed from "/categories/add" and "AddCatagory"
// Update
router.put("/categories/:id", categoriesController.updateCategory); // Matches "updateCategory"
// Delete
router.delete("/categories/:id", categoriesController.deleteCategory); // Matches "deleteCategory"
// Get - Read
router.get("/categories/:id", categoriesController.getCategoryById); // Added to match "getCategoryById"
router.get("/categories", categoriesController.getAllCategories); // Changed from "GetCategories"
>>>>>>> 30e6c4e909dbaae2e20635ebcfe49160168d85f4

// Brands
// Add - Create
router.post("/brands/add", brandsController.create);
// Update
router.put("/brands/update/:id", brandsController.update);
// Delete
router.delete("/brands/delete/:id", brandsController.delete);
// Get by ID
router.get("/brands/:id", brandsController.getById);
// Get al
router.get("/brands", brandsController.getAll);

// Keep the root route
router.get("/", (req, res) => {
  return res.json({ message: "This is API" });
});

module.exports = router;
