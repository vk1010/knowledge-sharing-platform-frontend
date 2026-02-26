import axiosInstance from './axiosInstance';

export const signup = async (data) => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};
