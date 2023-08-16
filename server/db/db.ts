import { Sequelize } from "sequelize";

const config = {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
const DB_NAME = "snerdy";
const DB_URL = `postgres://localhost/${DB_NAME}`;

const db = new Sequelize(process.env.DATABASE_URL || DB_URL, config);

export default db;
