import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from '../../config/config.json';

dotenv.config();

const { database, username, password, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as any, // Sequelize dialect types are string enums
});

export default sequelize;
