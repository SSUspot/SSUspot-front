import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../layout/header';
import Navigation from '../layout/navigation';
import axiosInstance from '../../utils/axiosInstance';
import PhotoLayout from './photoLayout';
import ContentLayout from './contentLayout';
import EditPostModal from './EditPostModal';
import ConfirmModal from '../common/ConfirmModal';
import { useToast } from '../common/ToastProvider';
import { postService } from '../../services/api/postService';
import { spotService } from '../../services/api/spotService';
import { handleApiError } from '../../utils/errorHandler';

import User from '../../type/user';
import Post from '../../type/post';
import Spot from '../../type/spot';

const PostDetail: React.FC<{ postId: number; handleCloseModal: () => void }> = ({
  postId,
  handleCloseModal,
}) => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [postInfo, setPostInfo] = useState<Post>();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 현재 사용자 정보 가져오기
  useEffect(() => {
    axiosInstance
      .get('/api/users')
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log('Failed to get current user', error);
      });
  }, []);

  // Spot 목록 가져오기
  useEffect(() => {
    spotService.getAllSpots()
      .then(setSpots)
      .catch((error) => {
        console.error('Failed to fetch spots', error);
      });
  }, []);

  // 게시물 정보 가져오기
  useEffect(() => {
    if (postId) {
      axiosInstance
        .get(`/api/posts/${postId}`)
        .then((response) => {
          console.log(`/api/posts/${postId}`, response.data);
          setPostInfo(response.data);
        })
        .catch((error) => {
          console.log(`/api/posts/${postId}`, error);
          showError(handleApiError(error));
        });
    }
  }, [postId]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await postService.deletePost(postId);
      showSuccess('게시물이 삭제되었습니다.');
      handleCloseModal();
      // 페이지 새로고침 또는 목록 업데이트
      router.reload();
    } catch (error) {
      showError(handleApiError(error));
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = (updatedPost: Post) => {
    setPostInfo(updatedPost);
    showSuccess('게시물이 수정되었습니다.');
  };

  const isOwner = currentUser && postInfo && currentUser.id === postInfo.user.id;

  if (!postInfo) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <Container onClick={handleOverlayClick}>
        <Content>
          <PhotoLayout postInfo={postInfo} />
          <ContentWrapper>
            <ContentLayout postInfo={postInfo} postId={postId} />
            {isOwner && (
              <ActionButtons>
                <EditButton onClick={handleEdit} data-testid="edit-post-button">
                  수정
                </EditButton>
                <DeleteButton onClick={() => setShowDeleteModal(true)} data-testid="delete-post-button">
                  삭제
                </DeleteButton>
              </ActionButtons>
            )}
          </ContentWrapper>
        </Content>
      </Container>

      {showEditModal && postInfo && (
        <EditPostModal
          post={postInfo}
          spots={spots}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="게시물 삭제"
        message="정말 이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isDestructive
      />
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 99;
`;

const Content = styled.div`
  width: 80%;
  height: 85%;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0.25, 0, 0.25);

  @media (max-width: 735px) {
    width: 90%;
    height: 80%;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const EditButton = styled(ActionButton)`
  background-color: #f0f0f0;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ffebee;
  color: #d32f2f;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;
