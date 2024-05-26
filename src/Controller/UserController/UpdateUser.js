const express = require('express');
const bodyParser = require('body-parser'); 
const sql = require('mssql');
const app = express();
const config = require('../../dbconfig.js'); 
const { Email } = require('../../env.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User registration
async function userUpdate(req, res) {
    try {
        const {  UserID,Password,  Height, Weight, Country,DietType } = req.body;

        // Connect to the database
        await sql.connect(config.config);
        console.log(config);
        // Creating request with parameters
        const result = await new sql.Request()
            .input('UserID',sql.Int,UserID)
            .input('Password', sql.NVarChar, Password)
            .input('Height', sql.Decimal, Height)
            .input('Weight', sql.Decimal, Weight)
            .input('Country', sql.NVarChar, Country)
            .input('DietType',sql.NVarChar,DietType)
            .execute('UpdateUser');

        console.log(result.returnValue);

        if (result.returnValue > 0) {
            res.json({ success: true, message: 'User Updated successfully' });
        } else {
            res.status(401).json({ success: false, message: 'User Updation Failed' });
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
    userUpdate: userUpdate,
};
