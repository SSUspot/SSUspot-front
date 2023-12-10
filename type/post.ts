import User from './user';

interface Post {
  id: number;
  title: string;
  content: string;
  user: User;
  imageUrls: string[];
  tags: string[];
  spotId: number;
  createdAt: string;
  updatedAt: string;
  hasLiked: boolean;
}

export default Post;
