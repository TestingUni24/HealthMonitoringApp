const router= require('express').Router();
const {signup}= require('../src/Controller/SignupController.js');
const {signin}= require('../src/Controller/SigninController.js');

//User-routing
router.post('/user/signup',signup);
router.post('/user/signin',signin);
//router.post('/user/forgotpassword',forgotpassword)
//router.post('/user/forgotpassword',forgotpassword)
//router.post('/user/forgotpassword',forgotpassword)
console.log(router);

module.exports=router;
