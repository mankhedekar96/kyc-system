import { Request, Response } from 'express';
import { submitKYC, updateKYCStatus, getAllKYCs, getKYCStatus } from '../services/kycService';

export const submitKYCController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, documentUrl } = req.body;

    if (!userId || !documentUrl) {
      res.status(400).json({ message: 'userId and documentUrl are required' });
      return;
    }

    const kycEntry = await submitKYC(userId, documentUrl);
    res.status(201).json({ message: 'KYC submitted successfully', kyc: kycEntry.get({ plain: true }) });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting KYC', error });
  }
};

export const getKYCStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.query.userId as string, 10);

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid userId' });
      return;
    }

    const kycEntry = await getKYCStatus(userId);
    if (!kycEntry) {
      res.status(404).json({ message: 'KYC data not found' });
      return;
    }

    res.status(200).json({ kyc: kycEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving KYC status', error });
  }
};

export const updateKYCStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid KYC ID' });
      return;
    }

    const { status, rejectionReason } = req.body;
    if (!status) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    const kycEntry = await updateKYCStatus(id, status, rejectionReason);
    res.status(200).json({ message: 'KYC status updated successfully', kyc: kycEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating KYC status', error });
  }
};

export const getAllKYCDataController = async (req: Request, res: Response): Promise<void> => {
  try {
    const kycData = await getAllKYCs();
    res.status(200).json(kycData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching KYC data', error });
  }
};
