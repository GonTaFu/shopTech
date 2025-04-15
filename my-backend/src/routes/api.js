var express = require("express");
var router = express.Router();

var productsController = require("../controllers/ProductsController");
var categoriesController = require("../controllers/CategoriesController");
var brandsController = require("../controllers/BrandsControllers");
var accountsController = require("../controllers/AccountsController");
var ordersController = require("../controllers/OrdersController");
var { authenticate, authorize } = require("../middlewares/auth");


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


// // Add - Create
// router.post("/categories", categoriesController.createCategory); // Changed from "/categories/add" and "AddCatagory"
// // Update
// router.put("/categories/:id", categoriesController.updateCategory); // Matches "updateCategory"
// // Delete
// router.delete("/categories/:id", categoriesController.deleteCategory); // Matches "deleteCategory"
// // Get - Read
// router.get("/categories/:id", categoriesController.getCategoryById); // Added to match "getCategoryById"
// router.get("/categories", categoriesController.getAllCategories); // Changed from "GetCategories"

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

// Account
router.post("/accounts/add", accountsController.addAccount);
router.put("/accounts/update/:id", accountsController.updateAccount);
router.delete("/accounts/delete/:id", accountsController.deleteAccount);
router.get("/accounts", accountsController.getAll);
router.get("/accounts/:id", accountsController.getById);
router.post("/accounts/login", accountsController.login);


// 
router.get("/", (req, res) => {
  return res.json({ message: "This is API" });
});

module.exports = router;
