import React from 'react';
import { VStack, Heading, Box, useColorModeValue } from 'native-base';
import TopicForm from '../components/topics/TopicForm';

const CreateTopicPage: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack space={6} alignItems="center">
      <Heading size="lg">Criar Novo Tema</Heading>

      <Box
        p={6}
        width="100%"
        maxWidth="600px"
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
      >
        <TopicForm />
      </Box>
    </VStack>
  );
};

export default CreateTopicPage;