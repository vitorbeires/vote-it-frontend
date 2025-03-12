import React from 'react';
import { VStack, FormControl, Input, TextArea, Button, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTopic } from '../../services/topicService';
import { useNavigate } from 'react-router-dom';

interface TopicFormData {
  title: string;
  description: string;
}

const TopicForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TopicFormData>();

  const createTopicMutation = useMutation(createTopic, {
    onSuccess: (data) => {
      toast.show({
        description: 'Tema criado com sucesso!',
        placement: 'top',
        status: 'success',
      });
      navigate(`/topics/${data._id}`);
    },
    onError: (error: any) => {
      toast.show({
        description: error.message || 'Erro ao criar tema',
        placement: 'top',
        status: 'error',
      });
    },
  });

  const onSubmit = (data: TopicFormData) => {
    createTopicMutation.mutate(data);
  };

  return (
    <VStack space={4} width="100%">
      <FormControl isRequired isInvalid={!!errors.title}>
        <FormControl.Label>Título</FormControl.Label>
        <Controller
          control={control}
          name="title"
          rules={{
            required: 'Título é obrigatório',
            minLength: {
              value: 5,
              message: 'Título deve ter pelo menos 5 caracteres',
            },
            maxLength: {
              value: 100,
              message: 'Título não pode ter mais de 100 caracteres',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Digite o título do tema"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.title?.message}</FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.description}>
        <FormControl.Label>Descrição</FormControl.Label>
        <Controller
          control={control}
          name="description"
          rules={{
            required: 'Descrição é obrigatória',
            minLength: {
              value: 10,
              message: 'Descrição deve ter pelo menos 10 caracteres',
            },
            maxLength: {
              value: 500,
              message: 'Descrição não pode ter mais de 500 caracteres',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder="Digite a descrição do tema"
              autoCompleteType={undefined}
              value={value}
              onChangeText={onChange}
              h={20}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.description?.message}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        mt={4}
        colorScheme="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting || createTopicMutation.isLoading}
        isLoadingText="Criando..."
      >
        Criar Tema
      </Button>
    </VStack>
  );
};

export default TopicForm;