
const { query } = require('mssql');
const config=require('../../dbconfig.js');
async function getCalories (req, res) 
{
    const { query } = req.body;

    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const response = await config.apiClient.get('/nutrition', {
            params: { query }
        });
        res.json(response.data);
    } catch (error) {
        res.send(error.message);
    }
};


module.exports={getCalories}



