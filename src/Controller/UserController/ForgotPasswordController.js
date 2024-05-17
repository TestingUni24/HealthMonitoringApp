const sql = require("mssql");
const config= require("../../dbconfig.js");
const userdata =require("../ActivityController/BMICalculator.js")
const { json } = require("body-parser");
const otpGenerator=require("otp-generator");
const nodemailer= require("nodemailer");
require("msnodesqlv8");


async function forgotmail(req, res) {
    const { Email } = req.body;
    try {
        await sql.connect(config.config);
        const request = await new sql.Request()
            .input('Email', sql.NVarChar, Email)
            .output('Output', sql.Int); // Define the output parameter here
    
        // Execute the stored procedure
        const data = await request.execute('UserCheck');
    
        // Retrieve the output parameter value
        const outputValue = data.output.Output;
        console.log(outputValue);
    
        // Check the output parameter value to determine login success or failure
        if (outputValue === 1) {
            const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tamangblonbikash@gmail.com', // Your Gmail email address
                pass: 'alwd mjli mcrl aind' // Your Gmail password
            }
            });
            const mailOptions = {
                from: 'tamangblonbikash@gmail.com',
                to: Email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otp}`
            };
        
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Failed to send OTP');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({ status: true, message: 'Mail Sent Successfully' ,Otp: otp  });
                }
            });
        

            
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


module.exports=
{
    forgotmail
}