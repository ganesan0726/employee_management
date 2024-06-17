const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "project_data",
  password: "root@123",
});

module.exports = connection;
