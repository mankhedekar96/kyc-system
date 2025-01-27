import { AxiosResponse } from 'axios';
import apiClient from './index';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await apiClient.post('/auth/register', data);
  return response;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', data);
  return response;
};
