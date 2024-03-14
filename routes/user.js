const express=require('express');
const router=express.Router();

const userControllers=require('../controllers/user')

router.get('/devices',userControllers.getDevices);

router.get('/devices/add-devices',userControllers.getAddDevice);

router.get('/mailbox',userControllers.getMailbox);

router.post('/devices/add-devices',userControllers.postAddDevice);
module.exports=router;