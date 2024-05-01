const sql= require('mssql');
const moment = require('moment');
const config= require("./dbconfig.js");
const { Time } = require('msnodesqlv8');

async function scheduleHydrationReminder(req, res) {
    const { Email, StartTime, IntervalMinutes } = req.body;

   // const givenTime = '2024-04-29T14:30:00';
    // Create a moment object with the given time
    const localTime = moment(StartTime);

    // Convert the local time to UTC
    const utcTime = localTime.utc();
    const formattedUTC = utcTime.format('YYYY-MM-DD HH:mm:ss');
    //const formattedStartTime = moment(timeInput, ['HH:mm', 'HH:mm:ss']).format('HH:mm:ss');
    
    //console.log('Given Time:', givenTime);
    console.log('UTC Time:', formattedUTC);

    /*if (!moment(formattedStartTime, 'HH:mm:ss', true).isValid()) {
        console.log('Invalid StartTime:', StartTime);
        return res.status(400).json({ error: `Invalid start time format. Please use 'HH:mm:ss' format.` });
    }*/

    try {
        // Connect to the database
        await sql.connect(config.activityconfig);
      //  console.log('StartTime:', formattedStartTime);
        // Set up the request
        const request = new sql.Request();
        request.input('Email', sql.VarChar, Email);
        request.input('StartTime', sql.Time,formattedUTC );
        request.input('IntervalMinutes', sql.Int, IntervalMinutes);
        //request.output('NewReminderID', sql.Int); // Define an output parameter

        // Execute the stored procedure
        const result = await request.execute('sp_HydrationRemainders');

        // Respond with success and the ID of the new reminder
        //const newReminderID = result.output.NewReminderID;
        return res.json({ success: true, reminderId: 1234 });
    } catch (error) {
        console.error('Error scheduling hydration reminder:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Ensure the SQL connection is closed
        sql.close();
    }
}

module.exports={
    scheduleHydrationReminder
}