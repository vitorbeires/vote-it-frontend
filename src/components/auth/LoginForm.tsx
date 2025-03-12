import React from 'react';
import { VStack, FormControl, Input, Button, Link, Text, HStack } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginData } from '../../types/auth';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <VStack space={4} width="100%">
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormControl.Label>Email</FormControl.Label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.email?.message}</FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.password}>
        <FormControl.Label>Senha</FormControl.Label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha é obrigatória',
            minLength: {
              value: 6,
              message: 'Senha deve ter pelo menos 6 caracteres',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.password?.message}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        mt={4}
        colorScheme="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
        isLoadingText="Entrando..."
      >
        Entrar
      </Button>

      <HStack mt={4} justifyContent="center">
        <Text>Não tem uma conta? </Text>
        <RouterLink to="/register">
          <Link colorScheme="primary">Registre-se</Link>
        </RouterLink>
      </HStack>
    </VStack>
  );
};

export default LoginForm;