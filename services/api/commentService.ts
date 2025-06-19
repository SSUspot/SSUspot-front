import axiosInstance from '@/utils/axiosInstance';
import { CreateCommentRequest, UpdateCommentRequest } from '@/type/api/request';
import { CommentResponse } from '@/type/api/response';
import Comment from '@/type/comment';
import { transformComment, transformComments } from '@/utils/transformers';

interface PaginationParams {
  page?: number;
  size?: number;
}

export const commentService = {
  /**
   * 게시물의 댓글 목록 조회
   */
  async getComments(postId: number, params: PaginationParams = {}): Promise<Comment[]> {
    const response = await axiosInstance.get(`/api/posts/${postId}/comments`, {
      params: {
        page: params.page || 1,
        size: params.size || 10,
      }
    });
    return transformComments(response.data, postId);
  },

  /**
   * 특정 댓글 조회
   */
  async getComment(commentId: number): Promise<Comment> {
    const response = await axiosInstance.get(`/api/comments/${commentId}`);
    return transformComment(response.data);
  },

  /**
   * 댓글 작성
   */
  async createComment(postId: number, data: CreateCommentRequest): Promise<Comment> {
    const response = await axiosInstance.post(`/api/posts/${postId}/comments`, data);
    return transformComment(response.data, postId);
  },

  /**
   * 댓글 수정
   */
  async updateComment(commentId: number, data: UpdateCommentRequest): Promise<Comment> {
    const response = await axiosInstance.put(`/api/comments/${commentId}`, data);
    return transformComment(response.data);
  },

  /**
   * 댓글 삭제
   */
  async deleteComment(commentId: number): Promise<void> {
    await axiosInstance.delete(`/api/comments/${commentId}`);
  },
};