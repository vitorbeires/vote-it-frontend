import React from 'react';
import { VStack, Heading, Text, Button, Center, Icon } from 'native-base';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Center flex={1}>
      <VStack space={6} alignItems="center">
        <Icon as={FiAlertTriangle} size="6xl" color="yellow.500" />
        <Heading size="xl">404</Heading>
        <Heading size="md">Página não encontrada</Heading>
        <Text textAlign="center">
          A página que você está procurando não existe ou foi removida.
        </Text>
        <Button onPress={() => navigate('/')} colorScheme="primary">
          Voltar para a página inicial
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFoundPage;