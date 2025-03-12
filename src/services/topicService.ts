import api from './api';
import { Topic, TopicCreateData, TopicVoteData, TopicResponse, TopicsResponse } from '../types/topic';

// Obter todos os temas
export const getTopics = async (): Promise<Topic[]> => {
  const response = await api.get<TopicsResponse>('/topics');
  return response.data.data;
};

// Obter um tema específico
export const getTopic = async (id: string): Promise<Topic> => {
  const response = await api.get<TopicResponse>(`/topics/${id}`);
  return response.data.data;
};

// Criar um novo tema
export const createTopic = async (data: TopicCreateData): Promise<Topic> => {
  const response = await api.post<TopicResponse>('/topics', data);
  return response.data.data;
};

// Votar em um tema
export const voteTopic = async (id: string, data: TopicVoteData): Promise<Topic> => {
  const response = await api.post<TopicResponse>(`/topics/${id}/vote`, data);
  return response.data.data;
};