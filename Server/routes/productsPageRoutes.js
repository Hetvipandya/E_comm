const express = require('express');
const router = express.Router();
const productsPageController = require('../controllers/productsPageController');

router.get('/',productsPageController.getAllProductsPage);
router.get('/byId',productsPageController.getProductsPage);
router.post('/add',productsPageController.createProductsPage);
router.put('/',productsPageController.updateProductsPage);
router.delete('/',productsPageController.deleteProductsPage);


module.exports = router;