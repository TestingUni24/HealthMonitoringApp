const express= require('express');
const body=require('body-parser');
const app= express();
app.use(body.urlencoded({extended: false}))
app.use(express.json());

const signup= (req,res) =>{
    console.log(req.body.JSON),
    res.send(req.body);
};

module.exports= {signup};