import React from 'react';
import { VStack, FormControl, TextArea, Button, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTopicComment, addCommentReply } from '../../services/commentService';

interface CommentFormData {
  content: string;
}

interface CommentFormProps {
  topicId?: string;
  commentId?: string;
  isReply?: boolean;
  onSubmitted?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  topicId,
  commentId,
  isReply = false,
  onSubmitted,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>();

  const addCommentMutation = useMutation(
    (data: CommentFormData) =>
      isReply && commentId
        ? addCommentReply(commentId, data)
        : topicId
        ? addTopicComment(topicId, data)
        : Promise.reject('ID inválido'),
    {
      onSuccess: () => {
        reset();
        if (isReply && commentId) {
          queryClient.invalidateQueries(['commentReplies', commentId]);
        } else if (topicId) {
          queryClient.invalidateQueries(['topicComments', topicId]);
        }
        toast.show({
          description: isReply ? 'Resposta adicionada!' : 'Comentário adicionado!',
          placement: 'top',
          status: 'success',
        });
        if (onSubmitted) {
          onSubmitted();
        }
      },
      onError: (error: any) => {
        toast.show({
          description: error.message || 'Erro ao adicionar comentário',
          placement: 'top',
          status: 'error',
        });
      },
    }
  );

  const onSubmit = (data: CommentFormData) => {
    addCommentMutation.mutate(data);
  };

  return (
    <VStack space={2} width="100%">
      <FormControl isRequired isInvalid={!!errors.content}>
        <Controller
          control={control}
          name="content"
          rules={{
            required: 'Conteúdo é obrigatório',
            minLength: {
              value: 3,
              message: 'Conteúdo deve ter pelo menos 3 caracteres',
            },
            maxLength: {
              value: 500,
              message: 'Conteúdo não pode ter mais de 500 caracteres',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder={isReply ? 'Digite sua resposta...' : 'Digite seu comentário...'}
              autoCompleteType={undefined}
              value={value}
              onChangeText={onChange}
              h={isReply ? 16 : 20}
            />
          )}
        />
        <FormControl.ErrorMessage>{errors.content?.message}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        alignSelf="flex-end"
        colorScheme="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting || addCommentMutation.isLoading}
        isLoadingText="Enviando..."
        size={isReply ? 'sm' : 'md'}
      >
        {isReply ? 'Responder' : 'Comentar'}
      </Button>
    </VStack>
  );
};

export default CommentForm;