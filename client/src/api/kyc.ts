import apiClient from './index';

export const submitKYC = async (data: { userId: number; documentUrl: string }) => {
  const response = await apiClient.post('/kyc/submit', data);
  return response;
};

export const fetchKYCStatus = async (userId: number) => {
  const response = await apiClient.get(`/kyc/status`, {
    params: { userId },
  });
  return response;
};

export const updateKYCStatus = async (id: number, status: string, rejectionReason?: string) => {
  const response = await apiClient.put(`/kyc/${id}`, { status, rejectionReason });
  return response.data;
};

// Fetch all KYC data
export const fetchAllKYCData = async () => {
  const response = await apiClient.get('/kyc/all');
  return response;
};