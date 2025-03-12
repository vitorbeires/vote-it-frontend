import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from 'native-base';
import { AUTH_TOKEN_KEY } from '../config';
import { loginUser, registerUser, getCurrentUser } from '../services/authService';
import { LoginData, RegisterData, User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Erro ao obter usuário atual:', error);
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const { token } = await loginUser(data);
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      // Obter dados do usuário após login
      const userData = await getCurrentUser();
      setUser(userData);

      toast.show({
        description: 'Login realizado com sucesso!',
        placement: 'top',
        status: 'success',
      });
    } catch (error: any) {
      toast.show({
        description: error.message || 'Erro ao fazer login',
        placement: 'top',
        status: 'error',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const { token } = await registerUser(data);
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      // Obter dados do usuário após registro
      const userData = await getCurrentUser();
      setUser(userData);

      toast.show({
        description: 'Registro realizado com sucesso!',
        placement: 'top',
        status: 'success',
      });
    } catch (error: any) {
      toast.show({
        description: error.message || 'Erro ao registrar',
        placement: 'top',
        status: 'error',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    toast.show({
      description: 'Logout realizado com sucesso!',
      placement: 'top',
      status: 'info',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};