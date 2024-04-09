const router= require('express').Router();
const express= require('express');
const body=require('body-parser');
//const sql= require('mssql');
const {signup}= require('../src/Controller/SignupController.js');
const controller =require('./DBConnection.js')
const signin= require('../src/Login.js');
const SignupController = require('../src/Controller/SignupController.js');

//User-routing-Signup
router.post('/user/signup/userRegistration',SignupController.userRegistration);
//router.get('/user/signup/getdatawithquery',controller.getTestData);

router.post('/user/chklogin',signin.checkLogin);
//router.post('/user/forgotpassword',forgotpassword)
//router.post('/user/forgotpassword',forgotpassword)
//router.post('/user/forgotpassword',forgotpassword)
//console.log(router);

module.exports=router;
