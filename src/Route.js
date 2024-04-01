const router= require('express').Router();
const {signup}= require('../src/Controller/SignupController.js');

//routing
router.get('/user/signup',signup);
console.log(router);

module.exports=router;
