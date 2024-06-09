const express = require('express');
const bodyParser = require('body-parser'); 
const sql = require('mssql');
const app = express();
const config = require('../../dbconfig.js'); 
const { Email } = require('../../env.js');
const { Decimal } = require('msnodesqlv8');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User registration
async function userUpdate(req, res) {
    try {
        const {  UserID,Password,  Height, Weight, Country,DietType } = req.body;

        // Connect to the database
        await sql.connect(config.config);
        console.log(config);
        if(DietType=='Veg'){ DietType='VEG'}
        if(DietType=='Non-Veg'){ DietType='NON-VEG'}
        // Creating request with parameters
       // const getheight=new Decimal(Height);
        //console.log(getheight);
        //const getweight=new Decimal(Weight);
       // console.log(getweight);
        const result = await new sql.Request()
            .input('UserID',sql.Int,UserID)
            .input('Password', sql.NVarChar, Password)
            .input('Height', sql.Int, Height)
            .input('Weight', sql.Int, Weight)
            .input('Country', sql.NVarChar, Country)
            .input('DietType',sql.NVarChar,DietType)
            .execute('UpdateUser');

        console.log(result.returnValue);

        if (result.returnValue == 1) {
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
async function payment(req,res)
{
    try
    {
    const {  UserID,IsSubscribed} = req.body;

    // Connect to the database
    await sql.connect(config.config);
    
    // Creating request with parameters
    const result = await new sql.Request()
        .input('UserID',sql.Int,UserID)
        .input('IsSubscribed', sql.Bit, IsSubscribed)
        .execute('UpdateSubscription');

        if (result.returnValue == 1) {
            res.json({ success: true, message: 'User Subscribed successfully' });
        } else {
            res.status(401).json({ success: false, message: 'User Subscription Failed' });
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
    payment
};
