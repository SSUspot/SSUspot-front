// API 응답을 Frontend 타입으로 변환하는 유틸리티

import { PostResponse, CommentResponse, ImageResponse } from '@/type/api/response';
import Post from '@/type/post';
import Comment from '@/type/comment';
import { epochToISO } from './dateUtils';

/**
 * Backend PostResponse를 Frontend Post 타입으로 변환
 */
export const transformPost = (postResponse: PostResponse): Post => {
  return {
    id: postResponse.id,
    title: postResponse.title,
    content: postResponse.content,
    user: {
      id: postResponse.user.id,
      email: postResponse.user.email,
      userName: postResponse.user.userName,
      nickname: postResponse.user.nickname,
      profileMessage: postResponse.user.profileMessage,
      profileImageLink: postResponse.user.profileImageLink,
    },
    imageUrls: postResponse.images.map((img: ImageResponse) => img.imageUrl),
    tags: postResponse.tags,
    spotId: postResponse.spot.id,
    createdAt: epochToISO(postResponse.createdAt),
    updatedAt: epochToISO(postResponse.updatedAt),
    hasLiked: postResponse.hasLiked,
  };
};

/**
 * Backend CommentResponse를 Frontend Comment 타입으로 변환
 */
export const transformComment = (commentResponse: CommentResponse): Comment => {
  return {
    id: commentResponse.id,
    content: commentResponse.content,
    user: {
      id: commentResponse.user.id,
      email: commentResponse.user.email,
      userName: commentResponse.user.userName,
      nickname: commentResponse.user.nickname,
      profileMessage: commentResponse.user.profileMessage,
      profileImageLink: commentResponse.user.profileImageLink,
    },
    createdAt: epochToISO(commentResponse.createdAt),
    updatedAt: epochToISO(commentResponse.updatedAt),
  };
};

/**
 * Post 배열 변환
 */
export const transformPosts = (postResponses: PostResponse[]): Post[] => {
  return postResponses.map(transformPost);
};

/**
 * Comment 배열 변환
 */
export const transformComments = (commentResponses: CommentResponse[]): Comment[] => {
  return commentResponses.map(transformComment);
};