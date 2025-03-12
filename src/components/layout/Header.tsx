import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from 'native-base';
import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      px={4}
      py={3}
      bg={bgColor}
      borderBottomWidth={1}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      shadow="sm"
    >
      <Flex direction="row" justify="space-between" align="center">
        <RouterLink to="/">
          <Text fontSize="2xl" fontWeight="bold" color="primary.500">
            Vote-It
          </Text>
        </RouterLink>

        <HStack space={4} alignItems="center">
          <RouterLink to="/">
            <Text color={textColor} fontWeight="medium">
              Início
            </Text>
          </RouterLink>

          {isAuthenticated ? (
            <>
              <RouterLink to="/create-topic">
                <Button size="sm" colorScheme="primary" variant="solid">
                  Criar Tema
                </Button>
              </RouterLink>

              <Menu
                placement="bottom right"
                trigger={(triggerProps) => {
                  return (
                    <MenuButton {...triggerProps}>
                      <IconButton
                        icon={<FiUser />}
                        variant="ghost"
                        colorScheme="primary"
                        aria-label="Perfil"
                      />
                    </MenuButton>
                  );
                }}
              >
                <MenuList>
                  <MenuItem isDisabled>
                    <Text fontWeight="bold">{user?.name}</Text>
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut />}
                    onPress={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <RouterLink to="/login">
                <Button size="sm" colorScheme="primary" variant="outline">
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/register">
                <Button size="sm" colorScheme="primary" variant="solid">
                  Registrar
                </Button>
              </RouterLink>
            </>
          )}

          <IconButton
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            variant="ghost"
            colorScheme="primary"
            onPress={toggleColorMode}
            aria-label="Alternar tema"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;