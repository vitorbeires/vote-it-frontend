import axios from 'axios';
import { API_URL, AUTH_TOKEN_KEY } from '../config';

// Criar instância do axios com URL base
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros de autenticação (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = '/login';
    }
    
    // Formatar mensagem de erro
    const errorMessage = error.response?.data?.error || 'Ocorreu um erro na requisição';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;