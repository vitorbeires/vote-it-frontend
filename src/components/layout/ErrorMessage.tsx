import React from 'react';
import { Center, Text, VStack, Icon, Button } from 'native-base';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Ocorreu um erro. Por favor, tente novamente.',
  onRetry,
}) => {
  return (
    <Center flex={1} p={5}>
      <VStack space={4} alignItems="center">
        <Icon as={FiAlertCircle} size="xl" color="red.500" />
        <Text textAlign="center" color="gray.600">
          {message}
        </Text>
        {onRetry && (
          <Button onPress={onRetry} colorScheme="primary">
            Tentar novamente
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ErrorMessage;