const sql = require("mssql");
const config= require("../../dbconfig.js");
require("msnodesqlv8");

async function insertBlog(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID,Blog}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .input('Blog',sql.NVarChar,Blog)
            .execute('sp_InsertBlog');
            console.log(result.recordsets);
            if (result.returnvalue = 0) {
                res.json({ status: true, message:'Blog  inserted successfully' });
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


async function GetBlog(req,res)
{
    try
    {
        await sql.connect(config.activityconfig)
        const{UserID}= req.body;
        const result = await new sql.Request()
            .input('UserID', sql.Int,UserID )
            .execute('sp_GetBlog');
       
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
    insertBlog,
    GetBlog
}