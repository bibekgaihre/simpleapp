const express=require('express');
const router=express.Router();


const indexController=require('../app/controller/indexController');



router.get('/',indexController.index);
router.post('/register',indexController.register);
router.post('/login',indexController.login);
router.get('/logout',indexController.logout);

router.get('/dashboard',indexController.dashboard);
module.exports=router;