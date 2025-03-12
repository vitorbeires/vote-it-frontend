import React from 'react';
import { VStack, Text, Center, useColorModeValue } from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { getTopicComments } from '../../services/commentService';
import CommentCard from './CommentCard';
import LoadingSpinner from '../layout/LoadingSpinner';
import ErrorMessage from '../layout/ErrorMessage';

interface CommentListProps {
  topicId: string;
}

const CommentList: React.FC<CommentListProps> = ({ topicId }) => {
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useQuery(['topicComments', topicId], () => getTopicComments(topicId), {
    staleTime: 60000, // 1 minuto
  });

  if (isLoading) {
    return <LoadingSpinner message="Carregando comentários..." />;
  }

  if (isError) {
    return <ErrorMessage message="Erro ao carregar comentários" onRetry={refetch} />;
  }

  if (!comments || comments.length === 0) {
    return (
      <Center p={4}>
        <Text color={useColorModeValue('gray.500', 'gray.400')}>
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </Text>
      </Center>
    );
  }

  return (
    <VStack space={4} mt={2}>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </VStack>
  );
};

export default CommentList;