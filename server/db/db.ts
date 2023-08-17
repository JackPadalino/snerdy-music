import { Sequelize } from "sequelize";

const config = {
  logging: false,
};

const DB_NAME = "snerdy";
const DB_URL = `postgres://localhost/${DB_NAME}`;

// use this to connect to and configure onrender db
const db = new Sequelize(process.env.DATABASE_URL || DB_URL, config);

// use this to connect to and configure local db
// const db = new Sequelize(DB_URL, config);
export default db;
