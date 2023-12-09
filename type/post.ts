import User from './user';

interface Post {
  id: number;
  title: string;
  content: string;
  user: User;
  nickname: string;
  imageUrls: string[];
  tags: string[];
  spotId: number;
  createdAt: Date;
  updatedAt: Date;
  hasLiked: boolean;
}

export default Post;
