import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToast } from '../common/ToastProvider';
import { postService } from '../../services/api/postService';
import { handleApiError } from '../../utils/errorHandler';
import Post from '../../type/post';
import Spot from '../../type/spot';

interface EditPostModalProps {
  post: Post;
  spots: Spot[];
  onClose: () => void;
  onUpdate: (updatedPost: Post) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, spots, onClose, onUpdate }) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    spotId: post.spotId,
    tags: post.tags.join(', '),
    imageUrls: post.imageUrls
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showError('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      showError('내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const updatedPost = await postService.updatePost(post.id, {
        title: formData.title,
        content: formData.content,
        spotId: formData.spotId,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        imageUrls: formData.imageUrls
      });

      showSuccess('게시물이 수정되었습니다.');
      onUpdate(updatedPost);
      onClose();
    } catch (error) {
      showError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>게시물 수정</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Spot 선택</Label>
            <Select
              name="spotId"
              value={formData.spotId}
              onChange={handleInputChange}
              data-testid="spot-select"
            >
              {spots.map(spot => (
                <option key={spot.id} value={spot.id}>
                  {spot.spotName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="제목을 입력하세요"
              data-testid="post-title-input"
            />
          </FormGroup>

          <FormGroup>
            <Label>내용</Label>
            <TextArea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="내용을 입력하세요"
              rows={10}
              data-testid="post-content-input"
            />
          </FormGroup>

          <FormGroup>
            <Label>태그 (쉼표로 구분)</Label>
            <Input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="태그1, 태그2, 태그3"
              data-testid="post-tags-input"
            />
          </FormGroup>

          {formData.imageUrls.length > 0 && (
            <FormGroup>
              <Label>이미지</Label>
              <ImageList>
                {formData.imageUrls.map((url, index) => (
                  <ImageItem key={index}>
                    <img src={url} alt={`이미지 ${index + 1}`} />
                    <RemoveButton
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      data-testid={`remove-image-${index}`}
                    >
                      &times;
                    </RemoveButton>
                  </ImageItem>
                ))}
              </ImageList>
            </FormGroup>
          )}

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose} disabled={loading}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '수정 중...' : '수정하기'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditPostModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const ImageItem = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #ff4444;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
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

const SubmitButton = styled(Button)`
  background-color: #0070f3;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #0051cc;
  }
`;