import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { KYCFactory } from './kyc';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

const models = {
  User: UserFactory(sequelize),
  KYC: KYCFactory(sequelize),
};

// Define relationships
models.User.hasMany(models.KYC, { foreignKey: 'userId', as: 'kycData' });
models.KYC.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

export { sequelize, models };
