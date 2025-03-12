// Tipos relacionados aos temas

export interface Vote {
  user: string;
  value: 'up' | 'down';
}

export interface VoteCount {
  up: number;
  down: number;
  total: number;
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
  user: {
    _id: string;
    name: string;
  };
  votes: Vote[];
  voteCount: VoteCount;
  createdAt: string;
  updatedAt: string;
}

export interface TopicCreateData {
  title: string;
  description: string;
}

export interface TopicVoteData {
  value: 'up' | 'down';
}

export interface TopicResponse {
  success: boolean;
  data: Topic;
}

export interface TopicsResponse {
  success: boolean;
  count: number;
  data: Topic[];
}