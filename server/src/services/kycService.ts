import { models } from '../models';
import { KYC, KYCAttributes } from '../models/kyc';
import { UserAttributes } from '../models/user';

const { KYC: KYCModel } = models;

export const submitKYC = async (userId: number, documentPath: string): Promise<KYC> => {
  return await KYCModel.create({
    userId,
    status: 'pending',
    documentUrl: documentPath,
  });
};

export const updateKYCStatus = async (id: number, status: 'pending' | 'approved' | 'rejected', rejectionReason?: string): Promise<KYC> => {
  const kyc = await KYCModel.findByPk(id);
  if (!kyc) {
    throw new Error('KYC not found');
  }

  kyc.set('status', status);

  if(rejectionReason) kyc.set('rejectionReason', rejectionReason);

  await kyc.save();
  return kyc;
};

export const getKYCStatus = async (userId: number): Promise<KYC | null> => {
  return await KYCModel.findOne({ where: { userId }, order: [['createdAt', 'DESC']],});
};

interface KYCWithUser extends KYCAttributes {
  user?: Pick<UserAttributes, 'name' | 'email'>;
}

export const getAllKYCs = async (): Promise<KYCWithUser[]> => {
  const kycRecords = await KYCModel.findAll({
    attributes: ['id', 'userId', 'documentUrl', 'status', 'createdAt', 'updatedAt'],
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['name', 'email'],
      },
    ],
    order: [['createdAt', 'DESC']], // Order by `createdAt` descending
  });

  return kycRecords.map((kyc) => {
    const kycData = kyc.get({ plain: true });
    return kycData;
  });
};
