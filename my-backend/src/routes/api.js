var express = require("express");
var router = express.Router();

var productssController = require("../controllers/ProductsController");
var categoriesController = require("../controllers/CategoriesController");
var brandsController = require("../controllers/BrandsControllers");
var accountsController = require("../controllers/AccountsController");
var ordersController = require("../controllers/OrdersController");
var ordersDetailController = require("../controllers/OrdersDetailController");

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
