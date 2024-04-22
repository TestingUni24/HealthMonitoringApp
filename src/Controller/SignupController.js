const express= require('express');
const body=require('body-parser');
const sql= require('mssql');
const app= express();
const config= require('../dbconfig.js');
const { Email } = require('../env.js');

app.use(body.urlencoded({extended: false}))
app.use(express.json());


//User registration

async function userRegistration(req,res)
{
    try
    {
        const {Username,Email,Password,FirstName,LastName,DateOfBirth,Gender,Height,Weight,Country}= req.body;
        await sql.connect(config);
        
        //Creating request with parameters
        const result =await new sql.Request()
        .input('Username', sql.NVarChar,Username)
        .input('Email',sql.NVarChar,Email)
        .input('Password', sql.NVarChar,Password)
        .input('FirstName',sql.NVarChar, FirstName)
        .input('LastName',sql.NVarChar,LastName)
        .input('DateOfBirth',sql.Date, DateOfBirth)
        .input('Gender',sql.NVarChar,Gender)
        .input('Height',sql.Decimal,Height)
        .input('Weight',sql.Decimal,Weight)
        .input('Country',sql.NVarChar,Country)
        .execute('InsertUser')

        console.log(result.returnValue);
        
        if(result.returnValue > 0)
            res.json({ success: true, message: 'User registered successfully' });
        else
            res.status(401).json({ success: false, message: 'Email already exists',status:401 });

    }catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close();
    }
} 

module.exports = {
    userRegistration : userRegistration,
};
