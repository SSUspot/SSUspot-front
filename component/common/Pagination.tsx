import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  padding: 10px;
`;

const PageButton = styled.button<{ $isActive?: boolean; $isDisabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
  background-color: ${({ $isActive, theme }) => 
    $isActive ? (theme.colors.primary || '#007bff') : 'white'};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#333')};
  border-radius: 4px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  font-size: 14px;
  min-width: 40px;

  &:hover:not(:disabled) {
    background-color: ${({ $isActive, theme }) => 
      $isActive ? (theme.colors.primaryDark || '#0056b3') : '#f0f0f0'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  padding: 0 8px;
  color: #666;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
  margin: 0 16px;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5
}) => {
  // 페이지 번호 배열 생성
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfShow = Math.floor(maxPagesToShow / 2);
    
    // 시작 페이지 계산
    let startPage = Math.max(1, currentPage - halfShow);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // 끝에 가까운 경우 시작 페이지 조정
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // 첫 페이지
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }
    
    // 중간 페이지들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        $isDisabled={currentPage === 1}
        data-testid="pagination-prev"
      >
        이전
      </PageButton>
      
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }
        
        const pageNum = page as number;
        return (
          <PageButton
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            $isActive={pageNum === currentPage}
            data-testid={`pagination-page-${pageNum}`}
          >
            {pageNum}
          </PageButton>
        );
      })}
      
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        $isDisabled={currentPage === totalPages}
        data-testid="pagination-next"
      >
        다음
      </PageButton>
      
      <PageInfo>
        {currentPage} / {totalPages} 페이지
      </PageInfo>
    </PaginationContainer>
  );
};

export default Pagination;