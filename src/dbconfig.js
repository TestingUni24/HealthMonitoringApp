require("msnodesqlv8");
const config={
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





module.exports={ config};