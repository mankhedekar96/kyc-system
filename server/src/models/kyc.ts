import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { UserAttributes } from './user';

export interface KYCAttributes {
  id: number;
  userId: number;
  status: 'pending' | 'approved' | 'rejected';
  documentUrl: string;
  rejectionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KYCCreationAttributes extends Optional<KYCAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class KYC extends Model<KYCAttributes, KYCCreationAttributes> implements KYCAttributes {
  public id!: number;
  public userId!: number;
  public status!: 'pending' | 'approved' | 'rejected';
  public documentUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public rejectionReason?: string;

  public user?: Pick<UserAttributes, 'id' | 'name' | 'email'>;
}

export const KYCFactory = (sequelize: Sequelize) => {
  return KYC.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      documentUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rejectionReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'kyc_data',
      timestamps: true,
    }
  );
};
