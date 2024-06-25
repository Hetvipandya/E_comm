const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

//done
router.get('/',orderController.getAllOrder);
router.get('/:id',orderController.getOrder);
router.post('/add',orderController.createOrder);
router.put('/',orderController.updateOrder);
router.delete('/order',orderController.deleteOrder);

module.exports = router;