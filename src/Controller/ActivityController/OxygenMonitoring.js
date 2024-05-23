const sql = require("mssql");
const config= require("../../dbconfig.js");
require("msnodesqlv8");

async function insertOxygen(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,Oxygen}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('Oxygen',sql.Float,Oxygen)
            .execute('sp_InsertOxygen');
       
            if (result.returnValue = 0) {
                res.json({ status: true, message: 'Oxygen Data inserted successfully' });
            } else {
                res.status(401).json({ status: false, message: 'Something Went wrong' });
            }
    }
    catch(err)
    {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }
}


async function GetOxygen(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,SDate,EDate}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('SDate', sql.Date, SDate)
            .input('EDate', sql.Date, EDate)
            .execute('sp_GetOxygen');
       
            res.json(result.recordset);
    }
    catch(err)
    {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' })
    }
    finally
    {
        sql.close();
    }
}

module.exports ={
    insertOxygen,
    GetOxygen
}