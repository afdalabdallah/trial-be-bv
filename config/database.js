const { Sequelize: Database } = require("sequelize");

const Sequelize = new Database(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

Sequelize.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const Timestamp = {
  CREATED_AT: "CURRENT_TIMESTAMP",
  UPDATED_AT: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
};

module.exports = { Sequelize, Timestamp };
