import React from 'react';
import { VStack, Text, Center, Button, Box, Select } from 'native-base';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTopics, voteTopic } from '../../services/topicService';
import TopicCard from './TopicCard';
import LoadingSpinner from '../layout/LoadingSpinner';
import ErrorMessage from '../layout/ErrorMessage';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopicList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = React.useState('newest');

  const {
    data: topics,
    isLoading,
    isError,
    refetch,
  } = useQuery(['topics'], getTopics, {
    staleTime: 60000, // 1 minuto
  });

  const voteMutation = useMutation(
    ({ topicId, value }: { topicId: string; value: 'up' | 'down' }) =>
      voteTopic(topicId, { value }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['topics']);
      },
    }
  );

  const handleVote = (topicId: string, value: 'up' | 'down') => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    voteMutation.mutate({ topicId, value });
  };

  const sortedTopics = React.useMemo(() => {
    if (!topics) return [];

    const topicsCopy = [...topics];

    switch (sortBy) {
      case 'newest':
        return topicsCopy.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return topicsCopy.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'mostVoted':
        return topicsCopy.sort((a, b) => b.voteCount.total - a.voteCount.total);
      case 'leastVoted':
        return topicsCopy.sort((a, b) => a.voteCount.total - b.voteCount.total);
      default:
        return topicsCopy;
    }
  }, [topics, sortBy]);

  if (isLoading) {
    return <LoadingSpinner message="Carregando temas..." />;
  }

  if (isError) {
    return <ErrorMessage message="Erro ao carregar temas" onRetry={refetch} />;
  }

  if (!topics || topics.length === 0) {
    return (
      <Center flex={1} p={5}>
        <Text mb={4}>Nenhum tema encontrado.</Text>
        {isAuthenticated && (
          <Button onPress={() => navigate('/create-topic')} colorScheme="primary">
            Criar o primeiro tema
          </Button>
        )}
      </Center>
    );
  }

  return (
    <VStack space={4}>
      <Box alignItems="flex-end" mb={2}>
        <Select
          selectedValue={sortBy}
          minWidth="200px"
          accessibilityLabel="Ordenar por"
          placeholder="Ordenar por"
          onValueChange={(value) => setSortBy(value)}
        >
          <Select.Item label="Mais recentes" value="newest" />
          <Select.Item label="Mais antigos" value="oldest" />
          <Select.Item label="Mais votados" value="mostVoted" />
          <Select.Item label="Menos votados" value="leastVoted" />
        </Select>
      </Box>

      {sortedTopics.map((topic) => (
        <TopicCard key={topic._id} topic={topic} onVote={handleVote} />
      ))}
    </VStack>
  );
};

export default TopicList;