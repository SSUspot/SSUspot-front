import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ $type: ToastType; $isClosing: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${props => props.$isClosing ? slideOut : slideIn} 0.3s ease-in-out;
  cursor: pointer;
  
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.colors.success || '#4CAF50';
      case 'error':
        return theme.colors.error || '#F44336';
      case 'warning':
        return theme.colors.warning || '#FF9800';
      case 'info':
      default:
        return theme.colors.info || '#2196F3';
    }
  }};
  
  color: white;
`;

const ToastMessage = styled.span`
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  margin-left: 12px;
  cursor: pointer;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(message.id);
    }, 300);
  };

  return (
    <ToastContainer
      $type={message.type}
      $isClosing={isClosing}
      onClick={handleClose}
    >
      <ToastMessage>{message.message}</ToastMessage>
      <CloseButton onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}>
        ×
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;