import React from 'react';
import { VStack, IconButton, Text, useColorModeValue } from 'native-base';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { VoteCount } from '../../types/topic';

interface VoteButtonsProps {
  voteCount: VoteCount;
  onUpvote: () => void;
  onDownvote: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  voteCount,
  onUpvote,
  onDownvote,
  size = 'md',
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'lg';
      default:
        return 'md';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'xl';
      default:
        return 'md';
    }
  };

  const getTextColor = () => {
    if (voteCount.total > 0) return 'green.500';
    if (voteCount.total < 0) return 'red.500';
    return useColorModeValue('gray.600', 'gray.400');
  };

  return (
    <VStack alignItems="center" space={1}>
      <IconButton
        icon={<FiChevronUp />}
        variant="ghost"
        colorScheme="primary"
        onPress={onUpvote}
        aria-label="Upvote"
        size={getIconSize()}
      />

      <Text fontSize={getFontSize()} fontWeight="bold" color={getTextColor()}>
        {voteCount.total}
      </Text>

      <IconButton
        icon={<FiChevronDown />}
        variant="ghost"
        colorScheme="primary"
        onPress={onDownvote}
        aria-label="Downvote"
        size={getIconSize()}
      />
    </VStack>
  );
};

export default VoteButtons;