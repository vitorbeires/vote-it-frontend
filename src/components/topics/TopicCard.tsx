import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, HStack, VStack, Flex, useColorModeValue } from 'native-base';
import { Topic } from '../../types/topic';
import VoteButtons from './VoteButtons';
import { formatDate } from '../../utils/dateUtils';

interface TopicCardProps {
  topic: Topic;
  onVote?: (topicId: string, value: 'up' | 'down') => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onVote }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={4}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="md"
      bg={bgColor}
      shadow="sm"
      mb={4}
    >
      <Flex direction="row">
        <VoteButtons
          voteCount={topic.voteCount}
          onUpvote={() => onVote && onVote(topic._id, 'up')}
          onDownvote={() => onVote && onVote(topic._id, 'down')}
        />

        <VStack flex={1} ml={4}>
          <RouterLink to={`/topics/${topic._id}`}>
            <Heading size="md" mb={2}>
              {topic.title}
            </Heading>
          </RouterLink>

          <Text noOfLines={2} mb={3} color={useColorModeValue('gray.600', 'gray.400')}>
            {topic.description}
          </Text>

          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              Por {topic.user.name}
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              {formatDate(topic.createdAt)}
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default TopicCard;