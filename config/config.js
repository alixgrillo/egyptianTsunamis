require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.password,
    database: "testdb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.password,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
