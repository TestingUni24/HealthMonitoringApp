//Declaring the files
const router= require('express').Router();
const express= require('express');
const body=require('body-parser');
const controller =require('./Controller/ActivityController/BMICalculator.js')
const Hydration= require('./Controller/ActivityController/HydrationRemainder.js')
const signin= require('./Controller/UserController/Login.js');
const fcontroller= require('./Controller/UserController/ForgotPasswordController.js');
const SignupController = require('./Controller/UserController/SignupController.js');
const ResetController =require('./Controller/UserController/ResetPassword.js')

//User-routing-Signup
//Registration
router.post('/user/signup/userregistration',SignupController.userRegistration);

//Forgot Password
router.post('/user/singup/forgotpassword',fcontroller.forgotmail);

//Reset Password
router.post('/user/signup/resetpassword', ResetController.resetpassword);

//Login
router.post('/user/chklogin',signin.checkLogin);

//Activity Tracking
router.post('/user/activity/calculateBMI',controller.calculateBMI);
router.post('/user/activity/scheduleHydrationReminder',Hydration.scheduleHydrationReminder);


module.exports=router;
