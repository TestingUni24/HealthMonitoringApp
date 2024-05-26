const sql = require("mssql");
const config= require("../../dbconfig.js");
const { NVarChar } = require("msnodesqlv8");
require("msnodesqlv8");

async function insertWorkout(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,WorkoutType,Duration}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('WorkoutType',sql.NVarChar,WorkoutType)
            .input('Duration',sql.Time,Duration)
            .execute('sp_InsertWorkout');
       
            if (result.returnValue = 0) {
                res.json({ status: true, message:'Workout Data inserted successfully' });
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


async function GetWorkout(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,SDate,EDate}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('SDate', sql.Date, SDate)
            .input('EDate', sql.Date, EDate)
            .execute('sp_GetWorkout');
       
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
    insertWorkout,
    GetWorkout
}