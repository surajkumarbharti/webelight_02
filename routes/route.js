const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const productController = require("../controllers/productController")
const adminController = require("../controllers/adminController")

const { userAuth, Authorisation } = require('../utils/auth')





router.post('/register', userController.createUser);  //CreateUser
router.post('/login', userController.loginUser);
router.post('/createProduct',productController.createProduct)
router.put('/products/:productId',productController.updateproduct)
router.get('/filterProduct',productController.getproducts)

router.delete('/products/:productId',productController.deleteProductById)

router.get('/admin', adminController.getallUser)

module.exports = router;