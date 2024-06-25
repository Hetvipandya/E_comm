const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// done
router.get('/',usersController.getAllUsers); 
router.get('/id',usersController.getAllUserIds); 
router.get('/name',usersController.getUsers);
router.post('/add',usersController.createUsers);
router.put('/user',usersController.updateUsers);
router.delete('/delete',usersController.deleteUsers);

module.exports = router;