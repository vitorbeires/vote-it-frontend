import React, { useState } from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Divider,
  useColorModeValue,
  Collapse,
} from 'native-base';
import { Comment } from '../../types/comment';
import { formatDate } from '../../utils/dateUtils';
import CommentForm from './CommentForm';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCommentReplies } from '../../services/commentService';
import LoadingSpinner from '../layout/LoadingSpinner';

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, isReply = false }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const {
    data: replies,
    isLoading: repliesLoading,
    refetch: refetchReplies,
  } = useQuery(
    ['commentReplies', comment._id],
    () => getCommentReplies(comment._id),
    {
      enabled: showReplies,
      staleTime: 60000, // 1 minuto
    }
  );

  const handleReplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowReplyForm(!showReplyForm);
  };

  const handleViewReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplySubmitted = () => {
    setShowReplyForm(false);
    if (showReplies) {
      refetchReplies();
    } else {
      setShowReplies(true);
    }
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="md"
      bg={bgColor}
      mb={4}
      ml={isReply ? 8 : 0}
    >
      <VStack space={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">{comment.user.name}</Text>
          <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
            {formatDate(comment.createdAt)}
          </Text>
        </HStack>

        <Text>{comment.content}</Text>

        {!isReply && (
          <HStack space={2} mt={2}>
            <Button
              size="xs"
              variant="ghost"
              onPress={handleReplyClick}
              colorScheme="primary"
            >
              Responder
            </Button>

            {!repliesLoading && replies && replies.length > 0 && (
              <Button
                size="xs"
                variant="ghost"
                onPress={handleViewReplies}
                colorScheme="gray"
              >
                {showReplies ? 'Ocultar respostas' : `Ver ${replies.length} respostas`}
              </Button>
            )}
          </HStack>
        )}

        {showReplyForm && (
          <Box mt={2}>
            <Divider mb={2} />
            <CommentForm
              commentId={comment._id}
              isReply
              onSubmitted={handleReplySubmitted}
            />
          </Box>
        )}

        {showReplies && (
          <Collapse isOpen={showReplies}>
            <Box mt={2}>
              <Divider mb={4} />
              {repliesLoading ? (
                <LoadingSpinner message="Carregando respostas..." />
              ) : replies && replies.length > 0 ? (
                <VStack space={2}>
                  {replies.map((reply) => (
                    <CommentCard key={reply._id} comment={reply} isReply />
                  ))}
                </VStack>
              ) : (
                <Text color={useColorModeValue('gray.500', 'gray.400')}>
                  Nenhuma resposta ainda.
                </Text>
              )}
            </Box>
          </Collapse>
        )}
      </VStack>
    </Box>
  );
};

export default CommentCard;