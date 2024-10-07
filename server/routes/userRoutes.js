const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');


router.post('/users',userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getSingleUser);


module.exports = router;