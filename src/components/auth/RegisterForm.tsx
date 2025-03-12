import React from 'react';
import { VStack, FormControl, Input, Button, Link, Text, HStack } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../types/auth';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterData & { confirmPassword: string }>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    try {
      await register(data);
      navigate('/');
    } catch (error) {
      console.error('Erro no registro:', error);
    }
  };

  return (
    <VStack space={4} width="100%">
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormControl.Label>Nome</FormControl.Label>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Nome é obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter pelo menos 3 caracteres',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Digite seu nome"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.name?.message}</FormControl.ErrorMessage>
      </FormControl>

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

      <FormControl isRequired isInvalid={!!errors.confirmPassword}>
        <FormControl.Label>Confirmar Senha</FormControl.Label>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirmação de senha é obrigatória',
            validate: (value) =>
              value === password || 'As senhas não coincidem',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme sua senha"
              type="password"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.confirmPassword?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <Button
        mt={4}
        colorScheme="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
        isLoadingText="Registrando..."
      >
        Registrar
      </Button>

      <HStack mt={4} justifyContent="center">
        <Text>Já tem uma conta? </Text>
        <RouterLink to="/login">
          <Link colorScheme="primary">Faça login</Link>
        </RouterLink>
      </HStack>
    </VStack>
  );
};

export default RegisterForm;