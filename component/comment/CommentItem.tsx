import React, { useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../common/ToastProvider';
import { commentService } from '../../services/api/commentService';
import { handleApiError } from '../../utils/errorHandler';
import { formatRelativeTime } from '../../utils/dateUtils';
import ConfirmModal from '../common/ConfirmModal';
import Comment from '../../type/comment';
import User from '../../type/user';

interface CommentItemProps {
  comment: Comment;
  currentUser: User | null;
  postId: number;
  onUpdate: (updatedComment: Comment) => void;
  onDelete: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUser,
  postId,
  onUpdate,
  onDelete
}) => {
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOwner = currentUser && currentUser.id === comment.user.id;

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      showError('댓글 내용을 입력해주세요.');
      return;
    }

    if (editContent === comment.content) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const updatedComment = await commentService.updateComment(
        postId,
        comment.id,
        { content: editContent }
      );
      onUpdate(updatedComment);
      setIsEditing(false);
      showSuccess('댓글이 수정되었습니다.');
    } catch (error) {
      showError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await commentService.deleteComment(postId, comment.id);
      onDelete(comment.id);
      showSuccess('댓글이 삭제되었습니다.');
    } catch (error) {
      showError(handleApiError(error));
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <CommentContainer data-testid="comment-item">
        <CommentHeader>
          <UserInfo>
            {comment.user.profileImageLink && (
              <ProfileImage 
                src={comment.user.profileImageLink} 
                alt={comment.user.nickname}
              />
            )}
            <UserName data-testid="comment-author">{comment.user.nickname}</UserName>
            <CommentDate data-testid="comment-date">
              {comment.createdAt ? formatRelativeTime(comment.createdAt) : ''}
            </CommentDate>
          </UserInfo>
          
          {isOwner && !isEditing && (
            <ActionButtons>
              <ActionButton onClick={handleEdit} data-testid="edit-comment">
                수정
              </ActionButton>
              <ActionButton 
                onClick={() => setShowDeleteModal(true)} 
                data-testid="delete-comment"
              >
                삭제
              </ActionButton>
            </ActionButtons>
          )}
        </CommentHeader>

        {isEditing ? (
          <EditContainer>
            <EditTextArea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="댓글을 입력하세요"
              data-testid="comment-edit-input"
              disabled={loading}
            />
            <EditActions>
              <CancelButton 
                onClick={handleCancelEdit} 
                disabled={loading}
                data-testid="cancel-edit"
              >
                취소
              </CancelButton>
              <SaveButton 
                onClick={handleSaveEdit} 
                disabled={loading}
                data-testid="save-comment"
              >
                {loading ? '저장 중...' : '저장'}
              </SaveButton>
            </EditActions>
          </EditContainer>
        ) : (
          <CommentContent data-testid="comment-content">
            {comment.content}
          </CommentContent>
        )}
      </CommentContainer>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="댓글 삭제"
        message="정말 이 댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isDestructive
      />
    </>
  );
};

export default CommentItem;

const CommentContainer = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EditContainer = styled.div`
  margin-top: 8px;
`;

const EditTextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #0070f3;
  }
  
  &:disabled {
    background-color: #f5f5f5;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
  
  &:hover:not(:disabled) {
    background-color: #d0d0d0;
  }
`;

const SaveButton = styled(Button)`
  background-color: #0070f3;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #0051cc;
  }
`;