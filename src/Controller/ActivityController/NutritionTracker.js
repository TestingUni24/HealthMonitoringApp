const sql = require("mssql");
const config= require("../../dbconfig.js");
const { Float, Int } = require("msnodesqlv8");
require("msnodesqlv8");

async function getMeals(req,res)
{
    try{
        const {UserID}= req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input('UserID',sql.Int,UserID)    
        .execute('sp_getMeals');
        
        if (result.returnValue > 0) {
            res.json({ success: true, message: 'User registered successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Email already exists' });
        }

    }
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }

}

async function getCuisine(req,res)
{
    try{
       
        await sql.connect(config.config);
        const result = await new sql.Request()    
        .execute('sp_getCuisine');
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }

}

async function getFood(req,res)
{
    try{
       
        const {UserID,CuisineID} = req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("CuisineID",sql.Int,CuisineID)    
        .execute('sp_getFood');
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }

}
async function getIntake(req,res)
{
    try{
       
        const {UserID,SDate,EDate} = req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("SDate",sql.Date,SDate)
        .input("EDate",sql.Date,EDate)    
        .execute('sp_ReportIntake');
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }

}
async function InsertIntake(req,res)
{
    try{
       
        const {UserID,MealID} = req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("MealID",sql.Int,MealID)    
        .execute('sp_InsertIntake');
        
        
        if (result.returnValue > 0) {
            res.json({ success: true, message: 'Meal added successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Something Went Wrong' });
        }
    }
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }

}

module.exports = 
{
    getMeals,
    getCuisine,
    getFood,
    InsertIntake,
    getIntake
}