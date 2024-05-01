const sql = require("mssql");
const config= require("./dbconfig.js");
const { Float } = require("msnodesqlv8");
require("msnodesqlv8");

//const conn= new sql.ConnectionPool()

async function calculateBMI(req,res ) {
    try {
        await sql.connect(config.activityconfig);
        //const {Email} =req.body;
        const { weight, height } = req.body;
        console.log(weight,height);
        // Validate the inputs
        if (!weight || !height) {
            return res.status(400).json({ error: 'Weight and height are required.' });
        }
    
        // Parse weight and height to floats
        const weightFloat = parseFloat(weight);
        const heightFloat = parseFloat(height);
    
        // Calculate BMI
        var BMIValue = weightFloat / (heightFloat * heightFloat);
        BMIValue=parseFloat(BMIValue);
        if (isNaN(BMIValue)) 
        {
            // Handle the error if the value could not be converted to a valid number
            return res.status(400).json({ error: 'Invalid BMI value. Please provide a valid number.' });
        }
        
       // console.log(BMIValue);
       //Getting data from DB for BMI Notes and description  
       const result = await new sql.Request()
            .input('BMIValue', sql.Decimal,BMIValue )
            .execute('sp_BMICheck');
        res.json(result.recordset);
    } 
    catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close();
    }
}



module.exports = {
    //getTestData,
    calculateBMI,
};

