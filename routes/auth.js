const express=require('express')

const router=express.Router();


const authController=require('../controllers/auth');

router.get('/',authController.getLogin);

router.post('/',authController.postSignUp);

router.get('/profile',authController.getProfile);

router.post('/profile',authController.postLogin);


module.exports=router;