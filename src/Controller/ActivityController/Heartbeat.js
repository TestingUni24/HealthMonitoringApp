const sql = require("mssql");
const config= require("../../dbconfig.js");
require("msnodesqlv8");

async function insertHearbeats(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,Beats,Timestamp:Dates}= req.body;
        const getDate=new Date(Dates);
        console.log(getDate);
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('Beats',sql.Int,Beats)
            .input('Timestamp', sql.DateTime, getDate)
            .execute('sp_InsertHeartBeats');
            console.log(result);
            if (result.returnValue == 0) {
                res.json({ status: true, message: 'Hearbeats inserted successfully' });
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
        console.log(req.body);
        const getSdate= new Date(SDate);
        const getEdate= new Date(EDate);
        console.log(SDate,EDate,getSdate,getEdate);
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('SDate', sql.Date, getSdate)
            .input('EDate', sql.Date, getEdate)
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