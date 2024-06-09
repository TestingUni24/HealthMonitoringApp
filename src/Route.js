//Declaring the files
const multer = require('multer');
const router= require('express').Router();
const express= require('express');
const body=require('body-parser');
const controller =require('./Controller/ActivityController/BMICalculator.js');
const Hydration= require('./Controller/ActivityController/HydrationRemainder.js');
const signin= require('./Controller/UserController/Login.js');
const fcontroller= require('./Controller/UserController/ForgotPasswordController.js');
const SignupController = require('./Controller/UserController/SignupController.js');
const ResetController =require('./Controller/UserController/ResetPassword.js');
const NutritionTracker= require('./Controller/ActivityController/NutritionTracker.js');
const StepCounter= require('./Controller/ActivityController/StepsCounter.js');
const Heartbeat= require('./Controller/ActivityController/Heartbeat.js');
const customPlan=require('./Controller/ActivityController/CustomWorkoutDiet.js');
const Oxygen= require('./Controller/ActivityController/OxygenMonitoring.js');
const NutritionTrackerScan=require('./Controller/ActivityController/NutritionTrackerScan.js');
const Swim=require('./Controller/ActivityController/SwimmingTracker.js');
const Blog= require('./Controller/ActivityController/HFBlog.js');
const Sleep=require('./Controller/ActivityController/SleepMonitoring.js');
const Workout= require('./Controller/ActivityController/WorkoutMonitoring.js');
const Update=require('./Controller/UserController/UpdateUser.js');
//User-routing-Signup
//Registration
router.post('/user/signup/userregistration',SignupController.userRegistration);

//Forgot Password
router.post('/user/signup/forgotpassword',fcontroller.forgotmail);

//Reset Password
router.post('/user/signup/resetpassword', ResetController.resetpassword);

//Login
router.post('/user/chklogin',signin.checkLogin);

//UserSubscription
router.post('/user/update/subscription',Update.payment);

//UserUpdate
router.post('/user/update/user',Update.userUpdate);


//Activity Tracking
router.post('/user/activity/calculateBMI',controller.calculateBMI);
router.post('/user/activity/stepcounter/insertsteps',StepCounter.insertSteps);
router.post('/user/activity/stepcounter/getsteps',StepCounter.GetSteps);
router.post('/user/activity/oxygen/insertoxygen',Oxygen.insertOxygen);
router.post('/user/activity/oxygen/getoxygen',Oxygen.GetOxygen);
router.post('/user/activity/blog/insertblog',Blog.insertBlog);
router.post('/user/activity/blog/getblog',Blog.GetBlog);
router.post('/user/activity/workout/insertWorkout',Workout.insertWorkout);
router.post('/user/activity/workout/getWorkout',Workout.GetWorkout);
router.post('/user/activity/swimming/insertswimming',Swim.insertSwimming);
router.post('/user/activity/swimming/getswimming',Swim.GetSwimming);
router.post('/user/activity/sleep/insertsleep',Sleep.insertSleep);
router.post('/user/activity/sleep/getsleep',Sleep.GetSleep);
router.post('/user/activity/heartbeat/insertheartbeat',Heartbeat.insertHearbeats);
router.post('/user/activity/heartbeat/getheartbeat',Heartbeat.GetHeartbeats);
router.post('/user/activity/customWorkoutplan/customplan',customPlan.customPlan);
router.post('/user/activity/scheduleHydrationReminder',Hydration.scheduleHydrationReminder);
router.post('/user/activity/nutritionTracker/getMeals',NutritionTracker.getMeals);
router.post('/user/activity/nutritionTracker/getFood',NutritionTracker.getFood);
router.post('/user/activity/nutritionTracker/getCuisine',NutritionTracker.getCuisine);
router.post('/user/activity/nutritionTracker/getIntake',NutritionTracker.getIntake);
router.post('/user/activity/nutritionTracker/insertFood',NutritionTracker.InsertFood);
router.post('/user/activity/nutritionTracker/InsertIntake',NutritionTracker.InsertIntake);

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
// Route to handle image upload and processing
//router.post('/user/activity/nutritionTracker/mealdata', upload.single('mealImage'), NutritionTrackerScan.scanMeal);
router.post('/user/activity/nutritionTracker/mealdata', NutritionTrackerScan.getCalories);





module.exports=router;
