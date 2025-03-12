import React from 'react';
import { Box, Heading, Text, VStack, HStack, Divider, useColorModeValue } from 'native-base';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTopic, voteTopic } from '../../services/topicService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import LoadingSpinner from '../layout/LoadingSpinner';
import ErrorMessage from '../layout/ErrorMessage';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import { formatDate } from '../../utils/dateUtils';

interface TopicDetailProps {
  topicId: string;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topicId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const {
    data: topic,
    isLoading,
    isError,
    refetch,
  } = useQuery(['topic', topicId], () => getTopic(topicId), {
    staleTime: 60000, // 1 minuto
  });

  const voteMutation = useMutation(
    ({ value }: { value: 'up' | 'down' }) => voteTopic(topicId, { value }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['topic', topicId]);
      },
    }
  );

  const handleVote = (value: 'up' | 'down') => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    voteMutation.mutate({ value });
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando tema..." />;
  }

  if (isError || !topic) {
    return <ErrorMessage message="Erro ao carregar tema" onRetry={refetch} />;
  }

  return (
    <VStack space={6}>
      <Box
        p={6}
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        shadow="sm"
      >
        <HStack alignItems="flex-start" space={4}>
          <VoteButtons
            voteCount={topic.voteCount}
            onUpvote={() => handleVote('up')}
            onDownvote={() => handleVote('down')}
            size="lg"
          />

          <VStack flex={1}>
            <Heading size="lg" mb={2}>
              {topic.title}
            </Heading>

            <Text mb={4}>{topic.description}</Text>

            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                Por {topic.user.name}
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                {formatDate(topic.createdAt)}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      <Divider />

      <VStack space={4}>
        <Heading size="md">Comentários</Heading>

        {isAuthenticated ? (
          <CommentForm topicId={topicId} />
        ) : (
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            <Text
              onPress={() => navigate('/login')}
              color="primary.500"
              fontWeight="bold"
              underline
            >
              Faça login
            </Text>{' '}
            para adicionar um comentário.
          </Text>
        )}

        <CommentList topicId={topicId} />
      </VStack>
    </VStack>
  );
};

export default TopicDetail;