const sql= require('mssql');
const config= require('../../dbconfig.js');

async function resetpassword(req, res) {
    const { Email,NewPassword } = req.body;
    try {
        await sql.connect(config.config);
        const request = await new sql.Request()
            .input('Email', sql.NVarChar, Email)
            .input('NewPassword',sql.NVarChar,NewPassword)
            .output('Output', sql.Int); // Define the output parameter here
    
        // Execute the stored procedure
        const data = await request.execute('UpdatePassword');
    
        // Retrieve the output parameter value
        const outputValue = data.output.Output;
        console.log(outputValue);
    
        // Check the output parameter value to determine Password Updation status success or failure
        if (outputValue === 1) 
        {
            res.json({ status: true, message: 'Password Updated successfully',statuscode: 200 });
        } 
        else {
            if(outputValue === 2)//Existing password check condition
            {
                res.json({ status: false, message: 'Password Mismatch', statuscode: 401 });
            }
            else
            {
                res.json({ status: false, message: 'Invalid username or password', statuscode: 401 });
            }
            
        }
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close(); // Close the database connection in the finally block
    }
    
}

module.exports={
    resetpassword
}