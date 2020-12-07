const router = require('express').Router();
const productController = require('../controller/productController');

const AUTH = require('../middleware/authorized');
router.get('/', productController.getIndexAndproducts);

//get add product page route
router.get('/add-product', AUTH.authorizedData, AUTH.isAdmin, productController.getAddProductForm);

//add new product route
router.post('/add-product', AUTH.authorizedData, AUTH.isAdmin, productController.addProduct);

//get products by category routes.
router.get('/categories/:category', AUTH.authorizedData, productController.getProductsByCategory);

//get welcome page 
router.get('/welcome/:userId/:role', productController.getIndexAndproducts);

//get logout
router.get('/logout', AUTH.removeToken, productController.getIndexAndproducts);

module.exports = router;