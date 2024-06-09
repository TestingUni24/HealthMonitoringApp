const sql = require("mssql");
const config= require("../../dbconfig.js");
require("msnodesqlv8");

// Function to calculate BMI
const calculateBMI = (weight, height) => {
    return weight / (height * height);
};

// Function to generate workout plan based on BMI
const WorkoutPlan = (bmi) => {
    if (bmi < 18.5) {
        return "Light workout with focus on gaining muscle mass.";
    } else if (bmi < 24.9) {
        return "Moderate workout with a mix of cardio and strength training.";
    } else if (bmi < 29.9) {
        return "Intense workout focusing on weight loss.";
    } else {
        return "High-intensity workout plan with strict cardio.";
    }
};

// Function to generate diet plan based on diet type
const DietPlan = (dietType) => {
    if (dietType === 'veg') {
        return "Balanced vegetarian meals with protein-rich foods like beans and lentils.";
    } else if (dietType === 'non-veg') {
        return "Protein-rich non-vegetarian meals including chicken, fish, and eggs.";
    } else if (dietType === 'vegan') {
        return "Balanced vegan meals with a focus on legumes, nuts, and seeds.";
    } else {
        return "Diet type not recognized.";
    }
};

async function customPlan (req, res)
{
    const { UserID, Weight, Height,DietType } = req.body;

    if (!UserID || !Weight || !Height || !DietType) {
        return res.status(400).send('Missing required parameters.');
    }

    const bmi = calculateBMI(Weight, Height);
    const workoutPlan = WorkoutPlan(bmi);
    const dietPlan = DietPlan(DietType);

    try {
        await sql.connect(config.config);

        // Insert workout plan using stored procedure
        const workout = await new sql.Request()
            .input('UserId', sql.Int, UserID)
            .input('Workout', sql.NVarChar, workoutPlan)
            .execute('InsertWorkout');

        // Insert diet plan using stored procedure
        const diet = await new sql.Request()
            .input('UserId', sql.Int, UserID)
            .input('Meal', sql.NVarChar, dietPlan)
            .execute('InsertDietPlan');

        res.status(201).send({ workoutPlan, dietPlan });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = {
    customPlan
}