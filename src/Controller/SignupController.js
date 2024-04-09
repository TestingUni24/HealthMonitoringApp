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
        const {Username,Email,Password,FirstName,LastName,DateOfBirth,Gender,Height,Country}= req.body;
        await sql.connect(config);
        const result =await new sql.Request()
        .input('Username', sql.NVarChar,Username)
        .input('Email',sql.NVarChar,Email)
        .input('PasswordHash', sql.NVarChar,Password)
        .input('FirstName',sql.NVarChar, FirstName)
        .input('LastName',sql.NVarChar,LastName)
        .input('DateOfBirth',sql.Date, DateOfBirth)
        .input('Gender',sql.NVarChar,Gender)
        .input('Height',sql.NVarChar,Height)
        .input('Country',sql.NVarChar,Country)
        .execute('InsertUser')

        if(result.returnValue() > 0)
            res.json({ success: true, message: 'Login successful' });
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
