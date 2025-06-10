import axiosInstance from '@/utils/axiosInstance';
import { CreatePostRequest, UpdatePostRequest } from '@/type/api/request';
import { PostResponse, LikeResponse } from '@/type/api/response';
import Post from '@/type/post';
import { transformPost, transformPosts } from '@/utils/transformers';

interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const postService = {
  /**
   * 추천 게시물 조회
   */
  async getRecommendedPosts(params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get('/api/posts/recommend', {
      params: {
        page: params.page || 1,
        size: params.size || 10,
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 팔로잉 사용자들의 게시물 조회 (피드)
   */
  async getFollowingPosts(params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get('/api/posts', {
      params: {
        page: params.page || 1,
        size: params.size || 10,
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 특정 게시물 조회
   */
  async getPost(postId: number): Promise<Post> {
    const response = await axiosInstance.get(`/api/posts/${postId}`);
    return transformPost(response.data);
  },

  /**
   * 내 게시물 조회
   */
  async getMyPosts(params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get('/api/posts/users/me', {
      params: {
        page: params.page || 1,
        size: params.size || 10,
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 특정 사용자의 게시물 조회
   */
  async getUserPosts(userId: number, params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get(`/api/posts/users/${userId}`, {
      params: {
        page: params.page || 1,
        size: params.size || 10,
        sort: params.sort || 'postId',
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 특정 스팟의 게시물 조회
   */
  async getPostsBySpot(spotId: number, params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get(`/api/posts/spots/${spotId}`, {
      params: {
        page: params.page || 1,
        size: params.size || 10,
        sort: params.sort || 'postId',
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 태그로 게시물 검색
   */
  async getPostsByTag(tagName: string, params: PaginationParams = {}): Promise<Post[]> {
    const response = await axiosInstance.get('/api/tags', {
      params: {
        tagName,
        page: params.page || 1,
        size: params.size || 10,
      }
    });
    return transformPosts(response.data);
  },

  /**
   * 게시물 작성
   */
  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await axiosInstance.post('/api/posts', data);
    return transformPost(response.data);
  },

  /**
   * 게시물 수정
   */
  async updatePost(postId: number, data: UpdatePostRequest): Promise<Post> {
    const response = await axiosInstance.patch(`/api/posts/${postId}`, data);
    return transformPost(response.data);
  },

  /**
   * 게시물 삭제
   */
  async deletePost(postId: number): Promise<void> {
    await axiosInstance.delete(`/api/posts/${postId}`);
  },

  /**
   * 게시물 좋아요/좋아요 취소
   */
  async toggleLike(postId: number): Promise<LikeResponse> {
    const response = await axiosInstance.post(`/api/posts/${postId}/likes`);
    return response.data;
  },
};