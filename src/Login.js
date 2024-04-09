//const express= require('express');
//const body=require('body-parser');
const sql= require('mssql');
//const app= express();
const config= require('../src/dbconfig.js');

async function checkLogin(req, res) {
    const { Email, Password } = req.body;
    try {
        await sql.connect(config);
        const result = await new sql.Request()
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, Password)
            .execute('LoginCheck');
        
        if (result.recordsets.entries() > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password',status:401 });
        }
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close();
    }
}

module.exports = {
    checkLogin
};