require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: process.env.DB_PW,
    database: "discover-workshops-registration",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: process.env.DB_PW,
    database: "discover-workshops-registration",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: process.env.DB_PW,
    database: "discover-workshops-registration",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  }
};
