const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(authController.protect, productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('storekeeper', 'admin'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('storekeeper'),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('storekeeper', 'admin'),
    productController.deleteProduct
  );

  

module.exports = router;
