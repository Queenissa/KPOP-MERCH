const router = require('express').Router();
const productController = require('../controller/productController');

const AUTH = require('../middleware/authorized');
router.get('/', productController.getIndexAndproducts);

//get add product page route
router.get('/add-product', AUTH.authorizedData, AUTH.isAdmin, productController.getAddProductForm);

//get product by id
router.get('/get/product/:productId', AUTH.authorizedData, productController.getProductById);

//add new product route
router.post('/add-product', AUTH.authorizedData, AUTH.isAdmin, productController.addProduct);

//get products by category routes.
router.get('/categories/:category', AUTH.getUser, productController.getProductsByCategory);

//get welcome page 
router.get('/welcome/:userId/:role', productController.getIndexAndproducts);

//get logout
router.get('/logout', AUTH.removeToken, productController.getIndexAndproducts);


//get sales 
router.get('/sales', AUTH.authorizedData, AUTH.isAdmin, productController.getSales);
module.exports = router;