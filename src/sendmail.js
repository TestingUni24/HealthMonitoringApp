/*const mailer= require("nodemailer");
const sender = mailer.createTransport(
    {
    host: 'smtp.gmail.com',
    secure: false,
    auth :{
        user: 'healthmonitoringapp24@gmail.com',
        pass: 'Healthapp@2024'
    }
});
module.exports= sender;
const composeemail= {
    from: 'healthmonitoringapp24@gmail.com',
    to : 'healthmonitoringapp24@gmail.com',
    subject : 'Forgot email fron health monitoring app',
    html : '<h1>Wlecome</h1>'
};

sender.sendMail(composeemail,function(error,info){
    if(error)
    {
        console.log(error,error.info)

    }
    else
    { 
        console.log("Mail sent successfully",+ info.response)
    }
});*/