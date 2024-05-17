const express = require('express');
const bodyParser = require('body-parser'); // Corrected the require statement
const sql = require('mssql');
const app = express();
const config = require('../../dbconfig.js'); // Ensure this file exports the correct configuration
const { Email } = require('../../env.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User registration
async function userRegistration(req, res) {
    try {
        const { Username, Email, Password, FirstName, LastName, DateOfBirth, Gender, Height, Weight, Country } = req.body;

        // Connect to the database
        await sql.connect(config.config);
        console.log(config);
        // Creating request with parameters
        const result = await new sql.Request()
            .input('Username', sql.NVarChar, Username)
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, Password)
            .input('FirstName', sql.NVarChar, FirstName)
            .input('LastName', sql.NVarChar, LastName)
            .input('DateOfBirth', sql.Date, DateOfBirth)
            .input('Gender', sql.NVarChar, Gender)
            .input('Height', sql.Decimal, Height)
            .input('Weight', sql.Decimal, Weight)
            .input('Country', sql.NVarChar, Country)
            .execute('InsertUser');

        console.log(result.returnValue);

        if (result.returnValue > 0) {
            res.json({ success: true, message: 'User registered successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Email already exists' });
        }

    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        // Ensure the SQL connection is closed properly
        sql.close().catch(err => console.error('Error closing the connection:', err));
    }
}

module.exports = {
    userRegistration: userRegistration,
};
