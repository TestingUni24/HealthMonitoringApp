const axios = require('axios');

exports.scanMeal = async (req, res) => {
    try {
        if (!req.body.food) {
            return res.status(400).json({ error: 'No food item provided' });
        }

        const foodItem = req.body.food;

        // Make a GET request to CalorieNinjas API
        const response = await axios.get(
            `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${encodeURIComponent(foodItem)}`,
            {
                headers: {
                    'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
                    'x-rapidapi-key': '0fd5604e22msha8fa3bee72537bbp1c61e3jsn7e50f039ae42'
                }
            }
        );

        // Extract nutrition information from the response
        const { name, calories, protein_g, fat_g, carbohydrate_g } = response.data.items[0];

        const nutritionInfo = {
            name,
            calories,
            protein: protein_g,
            fat: fat_g,
            carbohydrate: carbohydrate_g
        };

        res.json({ nutritionInfo });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve nutrition information' });
    }
};
