import axiosInstance from '@/utils/axiosInstance';
import { 
  RegisterRequest, 
  LoginRequest, 
  RefreshRequest,
  UpdateUserDataRequest 
} from '@/type/api/request';
import { 
  UserResponse, 
  LoginResponse, 
  UserInfoResponse,
  FollowUserResponse 
} from '@/type/api/response';

export const authService = {
  /**
   * 사용자 회원가입
   */
  async register(data: RegisterRequest): Promise<UserResponse> {
    const response = await axiosInstance.post('/api/users/register', data);
    return response.data;
  },

  /**
   * 사용자 로그인
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post('/api/users/login', data);
    // 토큰 저장
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  /**
   * 토큰 갱신
   */
  async refresh(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axiosInstance.post('/api/users/refresh', { 
      refreshToken 
    });
    
    // 새 토큰 저장
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/api/users/logout');
    } finally {
      // 로컬 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  /**
   * 현재 로그인한 사용자 정보 조회
   */
  async getCurrentUser(): Promise<UserResponse> {
    const response = await axiosInstance.get('/api/users');
    return response.data;
  },

  /**
   * 특정 사용자 정보 조회
   */
  async getUserInfo(userId: number): Promise<UserInfoResponse> {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data;
  },

  /**
   * 사용자 프로필 업데이트
   */
  async updateProfile(data: UpdateUserDataRequest): Promise<UserResponse> {
    const response = await axiosInstance.patch('/api/users', data);
    return response.data;
  },

  /**
   * 내 팔로잉 목록 조회
   */
  async getMyFollowing(): Promise<FollowUserResponse[]> {
    const response = await axiosInstance.get('/api/users/following');
    return response.data;
  },

  /**
   * 특정 사용자의 팔로잉 목록 조회
   */
  async getUserFollowing(userId: number): Promise<FollowUserResponse[]> {
    const response = await axiosInstance.get(`/api/users/${userId}/following`);
    return response.data;
  },

  /**
   * 내 팔로워 목록 조회
   */
  async getMyFollowers(): Promise<FollowUserResponse[]> {
    const response = await axiosInstance.get('/api/users/follower');
    return response.data;
  },

  /**
   * 특정 사용자의 팔로워 목록 조회
   */
  async getUserFollowers(userId: number): Promise<FollowUserResponse[]> {
    const response = await axiosInstance.get(`/api/users/${userId}/follower`);
    return response.data;
  },

  /**
   * 사용자 팔로우
   */
  async followUser(userId: number): Promise<FollowUserResponse> {
    const response = await axiosInstance.post(`/api/users/following/${userId}`);
    return response.data;
  },

  /**
   * 사용자 언팔로우
   */
  async unfollowUser(userId: number): Promise<void> {
    await axiosInstance.delete(`/api/users/following/${userId}`);
  },

  /**
   * 토큰 유효성 검증
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * 저장된 토큰 가져오기
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },
};