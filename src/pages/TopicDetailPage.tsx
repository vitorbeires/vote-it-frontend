import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, HStack, Icon } from 'native-base';
import { FiArrowLeft } from 'react-icons/fi';
import TopicDetail from '../components/topics/TopicDetail';

const TopicDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return null;
  }

  return (
    <Box>
      <HStack mb={6}>
        <Button
          leftIcon={<Icon as={FiArrowLeft} />}
          variant="ghost"
          onPress={() => navigate(-1)}
        >
          Voltar
        </Button>
      </HStack>

      <TopicDetail topicId={id} />
    </Box>
  );
};

export default TopicDetailPage;