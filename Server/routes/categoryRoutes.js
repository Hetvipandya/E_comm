const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//done
router.get('/',categoryController.getAllCategory);
router.get('/:id',categoryController.getCategory);
router.post('/add',categoryController.createCategory);
router.put('/',categoryController.updateCategory);
router.delete('/',categoryController.deleteCategory);

module.exports = router;