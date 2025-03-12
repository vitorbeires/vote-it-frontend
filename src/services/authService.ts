import api from './api';
import { LoginData, RegisterData, User, AuthResponse } from '../types/auth';

// Registrar um novo usuário
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Login de usuário
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

// Obter usuário atual
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ success: boolean; data: User }>('/auth/me');
  return response.data.data;
};