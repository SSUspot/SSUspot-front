import User from './user';

interface Comment {
  id: number;
  postId: number;
  user: User;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export default Comment;
