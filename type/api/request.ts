// API 요청 타입 정의

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
  nickname: string;
  profileMessage?: string;
  profileImageLink?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface UpdateUserDataRequest {
  userName?: string;
  nickname?: string;
  profileMessage?: string;
  profileImageLink?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrls: string[];
  tags: string[];
  spotId: number;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface CreateSpotRequest {
  spotName: string;
  spotThumbnailImageLink: string;
  spotAddress: string;
  spotInfo: string;
  spotLevel: number;
  latitude: number;
  longitude: number;
}