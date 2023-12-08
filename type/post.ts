interface Post {
    id: number;
    title: string;
    content: string;
    nickname: string;
    imageUrl: string;
    tags: string[];
    spotId: number;
    createdAt: Date;
    updatedAt: Date;
    hasLiked: boolean;
  }
  
  export default Post;
  