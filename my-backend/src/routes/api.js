var express = require('express');
var router = express.Router();

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



// // Categories
// // Add - Create
// router.post("/categories/add", categoriesController.AddCatagory);
// // Update
// router.put("/categories/update/:id", categoriesController.UpdateCategory);
// // Delete
// router.delete("/categories/delete/:id", categoriesController.DeleteCategory);
// // Get - Read
// router.get("/categories", categoriesController.GetCategories);


// 
router.get("/", (req, res) => {
    return res.json({message: "This is API"});
})

module.exports = router;