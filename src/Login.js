//const express= require('express');
//const body=require('body-parser');
const sql= require('mssql');
//const app= express();
const config= require('../src/dbconfig.js');

async function checkLogin(req, res) {
    const { Email } = req.body;
    try {
        await sql.connect(config);
        const request = await new sql.Request()
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, Password)
            .output('Output', sql.Int); // Define the output parameter here
    
        // Execute the stored procedure
        const data = await request.execute('LoginCheck');
    
        // Retrieve the output parameter value
        const outputValue = data.output.Output;
        console.log(outputValue);
    
        // Check the output parameter value to determine login success or failure
        if (outputValue === 1) {
            res.json({ status: true, message: 'Login successful' });
        } else {
            res.status(401).json({ status: false, message: 'Invalid username or password', statuscode: 401 });
        }
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close(); // Close the database connection in the finally block
    }
    
}

module.exports = {
    checkLogin
};