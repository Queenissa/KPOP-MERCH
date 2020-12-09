const router = require('express').Router();
const CartController = require('../controller/cartController');
const AUTH = require('../middleware/authorized');

//get all carts
router.get('/all', AUTH.authorizedData, CartController.getAllCarts);

//get carts by client id and the page
router.get('/:clientId', AUTH.authorizedData, CartController.getProductsByCustomer);

//add new cart
router.post('/add', AUTH.authorizedData, CartController.addToCart);

//delete cart by id
router.delete('/delete/:cartId', AUTH.authorizedData, CartController.deleteCart);

//update cart by Id 
router.put('/update/:id', AUTH.authorizedData, CartController.updateCartById);


//get order details and the order details page
router.get('/admin/order-details', AUTH.authorizedData, AUTH.isAdmin, CartController.getOrderDatails);

module.exports = router;
