import React from 'react';
import styled from 'styled-components';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{title}</Title>
        </ModalHeader>
        
        <ModalBody>
          <Message>{message}</Message>
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onCancel} data-testid="cancel-button">
            {cancelText}
          </CancelButton>
          <ConfirmButton
            onClick={onConfirm}
            $isDestructive={isDestructive}
            data-testid="confirm-delete"
          >
            {confirmText}
          </ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmModal;

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
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Message = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

const ConfirmButton = styled(Button)<{ $isDestructive: boolean }>`
  background-color: ${props => props.$isDestructive ? '#ff4444' : '#0070f3'};
  color: white;
  
  &:hover {
    background-color: ${props => props.$isDestructive ? '#cc0000' : '#0051cc'};
  }
`;