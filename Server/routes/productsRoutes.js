const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//done
router.get('/',productsController.getAllProducts);
router.get('/byId',productsController.getProducts);
router.get('/id',productsController.getProductsId);
router.post('/add',productsController.createProducts);
router.put('/',productsController.updateProducts);
router.delete('/',productsController.deleteProducts);

module.exports = router;