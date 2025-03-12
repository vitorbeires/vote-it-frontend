// Tipos relacionados aos comentários

export interface Comment {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
  };
  topic: string;
  parentComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateData {
  content: string;
}

export interface CommentResponse {
  success: boolean;
  data: Comment;
}

export interface CommentsResponse {
  success: boolean;
  count: number;
  data: Comment[];
}