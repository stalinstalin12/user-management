const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const accessControl=require('../utils/access-control').accesControl;
const{set }=require('mongoose');


function setaccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next)
    }
}

router.post('/users',setaccessControl("1"), userController.createUser);
router.get('/users',setaccessControl("1,2"), userController.getUsers);
router.get('/user/:id',setaccessControl("*"), userController.getSingleUser);


module.exports = router;