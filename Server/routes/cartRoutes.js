const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//done
router.get('/',cartController.getAllCart);
router.get('/:id',cartController.getCart);
router.post('/add',cartController.createCart);
router.put('/update',cartController.updateCart);
router.delete('/delete',cartController.deleteCart);

module.exports = router;