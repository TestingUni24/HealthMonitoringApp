const sql = require("mssql");
const config= require("../../dbconfig.js");
const { Float, Int } = require("msnodesqlv8");
require("msnodesqlv8");

async function getMeals(req,res)
{
    try{
        const {FoodID,CuisineID}= req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input('FoodID',sql.Int,FoodID)
        .input('CuisineID', sql.Int,CuisineID)    
        .execute('sp_getMeals');
        
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
        const getSdate= new Date(SDate);
        const getEdate= new Date(EDate);
        
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('SDate', sql.Date, getSdate)
            .input('EDate', sql.Date, getEdate)    
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
async function InsertFood(req,res)
{
    try{
       
        const {FoodName,Cal,Carb,Proteins,Fats,UserID} = req.body;
        
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("FoodName",sql.NVarChar,FoodName)
        .input("Cal",sql.Int,Cal)
        .input("Carb",sql.Int,Carb)
        .input("Protein",sql.Int,Proteins)    
        .input("Fats",sql.Int,Fats)
        .execute('sp_InsertFood');

        const FoodId= result.returnValue
        console.log(result.returnValue,FoodId);

        await sql.connect(config.config);
        const intakeresult = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("FoodID",sql.Int,result.returnValue)    
        .execute('sp_InsertIntake');
        
        if (intakeresult.returnValue == 0) {
            res.json({ success: true, message: 'Food added successfully' });
        } else {
            res.json({ success: false, message: 'Something Went Wrong' });
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

async function InsertIntake(req,res)
{
    try{
       
        const {UserID,FoodID} = req.body;
        await sql.connect(config.config);
        const result = await new sql.Request()
        .input("UserID",sql.Int,UserID)
        .input("FoodID",sql.Int,FoodID) 
        .execute('sp_InsertIntake');
        
        
        if (result.returnValue == 0) {
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
    getIntake,
    InsertFood
}