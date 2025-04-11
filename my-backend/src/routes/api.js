var express = require("express");
var router = express.Router();

<<<<<<< HEAD
var productsController = require('../controllers/ProductsController')
var categoriesController = require('../controllers/CategoriesController')
var brandsController = require('../controllers/BrandsControllers')
var accountsController = require('../controllers/AccountsController')
var ordersController = require('../controllers/OrdersController')
var ordersDetailController = require('../controllers/OrdersDetailController')

// Products
// Add - Create
router.post("/products/add", productsController.addProduct);
// Update
router.put("/products/update/:id", productsController.updateProduct);
// Delete
router.delete("/products/delete/:id", productsController.deleteProduct);
// Get - Read
router.get('/products/get/:id', productsController.getById);
router.get("/products", productsController.getAll);


=======
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

// Uncomment and update product routes if needed
// Products
// router.post("/products/add", productssController.AddProducts);
// router.put("/products/update/:id", productssController.UpdateProducts);
// router.delete("/products/delete/:id", productssController.DeleteProducts);
// router.get("/products", productssController.GetProducts);
>>>>>>> 26fa3c7dbf8cca7bf5770465d3a0d98da6270807

module.exports = router;
