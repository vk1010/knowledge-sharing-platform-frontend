import axiosInstance from './axiosInstance';

export const getAIAssistance = async (content, action, title = '') => {
  const response = await axiosInstance.post('/api/ai/assist', {
    content,
    action,
    title
  });
  return response.data;
};
