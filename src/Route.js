//Declaring the files
const router= require('express').Router();
const express= require('express');
const body=require('body-parser');
const controller =require('./DBConnection.js')
const signin= require('../src/Login.js');
const fcontroller= require('../src/Controller/ForgotPasswordController.js');
const SignupController = require('../src/Controller/SignupController.js');
const ResetController =require('../src/ResetPassword.js')

//User-routing-Signup
//Registration
router.post('/user/signup/userregistration',SignupController.userRegistration);

//GetUsers
router.post('/user/signup/getuserdata',controller.getTestData);

//Forgot Password
router.post('/user/singup/forgotpassword',fcontroller.forgotmail);

//Reset Password
router.post('/user/signup/resetpassword', ResetController.resetpassword);

//Login
router.post('/user/chklogin',signin.checkLogin);

//Activity Tracking


module.exports=router;
