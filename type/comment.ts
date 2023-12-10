import User from './user';

interface Comment {
  id: number;
  postId: number;
  user: User;
  content: string;
}

export default Comment;
