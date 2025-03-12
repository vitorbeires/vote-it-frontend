import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from 'native-base';
import { useAuth } from './contexts/AuthContext';

// Componentes
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TopicDetailPage from './pages/TopicDetailPage';
import CreateTopicPage from './pages/CreateTopicPage';
import NotFoundPage from './pages/NotFoundPage';

// Rota protegida que requer autenticação
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Box flex={1} safeArea>
      <Header />
      <Box flex={1} p={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/topics/:id" element={<TopicDetailPage />} />
          <Route
            path="/create-topic"
            element={
              <ProtectedRoute>
                <CreateTopicPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;