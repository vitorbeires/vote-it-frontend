import React from 'react';
import { VStack, Heading, Box } from 'native-base';
import TopicList from '../components/topics/TopicList';

const HomePage: React.FC = () => {
  return (
    <VStack space={6}>
      <Box>
        <Heading size="xl" mb={2}>
          Vote-It
        </Heading>
        <Heading size="md" fontWeight="normal" opacity={0.8}>
          Crie e vote em temas interessantes
        </Heading>
      </Box>

      <TopicList />
    </VStack>
  );
};

export default HomePage;