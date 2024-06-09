require("msnodesqlv8");
const config={
    user:'healthapp',
    password: 'Admin',
    database: "DB_LOGIN",
    server: "LAPTOP-65ISNPDE\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        useUTC: true,
    }
}

const activityconfig={
    user:'healthapp',
    password: 'Admin',
    database: "DB_Activity",
    server: "LAPTOP-65ISNPDE\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        useUTC: true,
    }
}

const axios = require('axios');

const apiClient = axios.create({
    baseURL: 'https://api.calorieninjas.com/v1',
    headers: {
        'X-Api-Key':'hOZo0POoWW6ALZ2XuHfycQ==LiohdtpfQmCw3msI'
    }
});


module.exports={ config, activityconfig,apiClient};