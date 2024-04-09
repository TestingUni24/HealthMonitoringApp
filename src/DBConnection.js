
const sql = require("mssql");
const config= require("./dbconfig.js");
require("msnodesqlv8");

//const conn= new sql.ConnectionPool()

async function getTestData(req, res) {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT name FROM Test`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
        sql.close();
    }
}

module.exports = {
    getTestData
};

