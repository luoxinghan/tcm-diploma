const mysql = require('mysql');
const josnContent = require('./databaseconfig');

const connection = mysql.createConnection({
   host: josnContent.host,
   user: josnContent.user,
   password: josnContent.password,
   database: josnContent.database
});
module.exports = connection;
