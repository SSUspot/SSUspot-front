// Backend API 응답 타입 정의

export interface ImageResponse {
  imageId: number;
  userId: number;
  imageUrl: string;
}

export interface UserResponse {
  id: number;
  email: string;
  userName: string;
  nickname: string;
  profileMessage?: string;
  profileImageLink?: string;
}

export interface SpotResponse {
  id: number;
  spotName: string;
  spotThumbnailImageLink: string;
  spotAddress: string;
  spotInfo: string;
  spotLevel: number;
  latitude: number;
  longitude: number;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  images: ImageResponse[];
  tags: string[];
  spot: SpotResponse;
  user: UserResponse;
  hasLiked: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: number; // epoch timestamp
  updatedAt: number; // epoch timestamp
}

export interface CommentResponse {
  id: number;
  content: string;
  user: UserResponse;
  createdAt: number;
  updatedAt: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LikeResponse {
  id: number;
  postId: number;
  userNickname: string;
  pressed: boolean;
}

export interface AlarmResponse {
  alarmId: number;
  commentedUser: string;
  articleTitle: string;
  commentContent: string;
}

export interface FollowUserResponse {
  userId: number;
  nickname: string;
  profileImageLink?: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  userName: string;
  nickname: string;
  profileMessage?: string;
  profileImageLink?: string;
  followed: boolean;
}