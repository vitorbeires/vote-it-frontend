import React from 'react';
import { Box, Text, HStack, Link, useColorModeValue } from 'native-base';

const Footer: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      px={4}
      py={3}
      bg={bgColor}
      borderTopWidth={1}
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <HStack justifyContent="center" alignItems="center">
        <Text fontSize="sm" color={textColor}>
          &copy; {new Date().getFullYear()} Vote-It. Todos os direitos reservados.
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;