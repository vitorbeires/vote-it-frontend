import React, { useEffect } from 'react';
import { VStack, Heading, Box, Center, useColorModeValue } from 'native-base';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center flex={1}>
      <Box
        p={8}
        width="100%"
        maxWidth="400px"
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
      >
        <VStack space={6} alignItems="center">
          <Heading size="lg">Registrar</Heading>
          <RegisterForm />
        </VStack>
      </Box>
    </Center>
  );
};

export default RegisterPage;