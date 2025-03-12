import React from 'react';
import { Center, Spinner, Text, VStack } from 'native-base';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Carregando...' }) => {
  return (
    <Center flex={1} p={5}>
      <VStack space={2} alignItems="center">
        <Spinner size="lg" color="primary.500" />
        <Text color="gray.500">{message}</Text>
      </VStack>
    </Center>
  );
};

export default LoadingSpinner;