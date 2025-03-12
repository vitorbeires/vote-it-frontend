import api from './api';
import { Comment, CommentCreateData, CommentResponse, CommentsResponse } from '../types/comment';

// Obter comentários de um tema
export const getTopicComments = async (topicId: string): Promise<Comment[]> => {
  const response = await api.get<CommentsResponse>(`/topics/${topicId}/comments`);
  return response.data.data;
};

// Adicionar um comentário a um tema
export const addTopicComment = async (topicId: string, data: CommentCreateData): Promise<Comment> => {
  const response = await api.post<CommentResponse>(`/topics/${topicId}/comments`, data);
  return response.data.data;
};

// Obter respostas de um comentário
export const getCommentReplies = async (commentId: string): Promise<Comment[]> => {
  const response = await api.get<CommentsResponse>(`/comments/${commentId}/replies`);
  return response.data.data;
};

// Adicionar uma resposta a um comentário
export const addCommentReply = async (commentId: string, data: CommentCreateData): Promise<Comment> => {
  const response = await api.post<CommentResponse>(`/comments/${commentId}/replies`, data);
  return response.data.data;
};