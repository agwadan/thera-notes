import { Sequelize } from "sequelize";
import { development } from "../config/config";

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
  }
);

const db: { sequelize: Sequelize; Sequelize: typeof Sequelize } = {
  sequelize,
  Sequelize,
};

export default db;
