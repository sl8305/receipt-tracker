require("dotenv").config();

module.exports = 
{
  "development": {
    "username": process.env.LOCALSQLUSER,
    "password": process.env.LOCALSQLPWD,
    "database": process.env.LOCALSQLDATABASE,
    "host": process.env.LOCALSQLHOST,
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "ReceiptTracker",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};
