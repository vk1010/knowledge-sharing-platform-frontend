#!/bin/bash

# API files
cat > src/api/authApi.js << 'EOF'
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
EOF

cat > src/api/articleApi.js << 'EOF'
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
EOF

cat > src/api/aiApi.js << 'EOF'
import axiosInstance from './axiosInstance';

export const getAIAssistance = async (content, action, title = '') => {
  const response = await axiosInstance.post('/api/ai/assist', {
    content,
    action,
    title
  });
  return response.data;
};
EOF

cat > src/utils/jwtUtils.js << 'EOF'
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
  return JSON.parse(localStorage.getItem('user') || 'null');
};
EOF

echo "API and Utils files created successfully"
