import axiosInstance from './axiosInstance';

export const getAllArticles = async () => {
  const response = await axiosInstance.get('/api/articles/public');
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axiosInstance.get(`/api/articles/public/${id}`);
  return response.data;
};

export const searchArticles = async (keyword, category) => {
  const params = {};
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  const response = await axiosInstance.get('/api/articles/public/search', { params });
  return response.data;
};

export const getMyArticles = async () => {
  const response = await axiosInstance.get('/api/articles/my-articles');
  return response.data;
};

export const createArticle = async (data) => {
  const response = await axiosInstance.post('/api/articles', data);
  return response.data;
};

export const updateArticle = async (id, data) => {
  const response = await axiosInstance.put(`/api/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axiosInstance.delete(`/api/articles/${id}`);
  return response.data;
};
