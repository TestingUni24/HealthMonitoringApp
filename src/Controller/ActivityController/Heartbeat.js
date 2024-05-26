const sql = require("mssql");
const config= require("../../dbconfig.js");
require("msnodesqlv8");

async function insertHearbeats(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,Steps,Date}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('Beats',sql.Int,Steps)
            .input('Timestamp', sql.Int, Date)
            .execute('sp_InsertHeartBeats');
       
            if (result.returnValue > 0) {
                res.json({ status: true, message: 'Steps inserted successfully' });
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


async function GetHeartbeats(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,SDate,EDate}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('SDate', sql.Date, SDate)
            .input('EDate', sql.Date, EDate)
            .execute('sp_GetHeartBeats');
       
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
    insertHearbeats,
    GetHeartbeats
}