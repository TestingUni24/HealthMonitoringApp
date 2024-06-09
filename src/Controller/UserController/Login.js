
const sql= require('mssql');
//const app= express();
const config= require('../../dbconfig.js');

async function checkLogin(req, res) {
    const { Email,Password } = req.body;
    console.log(config.config.server);
    try {
        await sql.connect(config.config);
        
        const request = await new sql.Request()
            .input('Email', sql.NVarChar, Email)
            .input('Password', sql.NVarChar, Password); 
    
        // Execute the stored procedure
        const data = await request.execute('LoginCheck');
        
        console.log(data.recordsets);
    
        // Check the output parameter value to determine login success or failure
        if (data.recordsets.length>0) {
            res.json({ status: true, message: 'Login successful',result:data.recordsets});
        } else {
            res.status(401).json({ status: false, message: 'Invalid username or password', statuscode: 401 });
        }
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close(); // Close the database connection in the finally block
    }
    
}

module.exports = {
    checkLogin
};