//importing http 
const http = require("http");
const express = require("express");
const app=express();
const appRoute= require('../src/Route.js');
const Port=process.env.Port || 3000;
app.use(express.json());

//Routes
app.use('/api',appRoute);

app.listen(Port,()=>{console.log('Server started...')});


