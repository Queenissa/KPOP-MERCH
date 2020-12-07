const router = require('express').Router();
const UserController = require('../controller/userController');

//register a new user
router.post('/add', UserController.addUser);

//login user
router.post('/login', UserController.loginUser); 


module.exports = router;