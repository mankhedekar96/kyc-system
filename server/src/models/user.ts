import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const UserFactory = (sequelize: Sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    }
  );
};
