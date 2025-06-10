import axios, { AxiosError } from 'axios';
import Router from 'next/router';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ErrorResponse {
  error: ApiError;
  timestamp: string;
  path: string;
}

/**
 * API 에러 처리를 위한 유틸리티
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    // 네트워크 에러
    if (!axiosError.response) {
      return '네트워크 연결을 확인해주세요.';
    }
    
    // 401 Unauthorized - 로그인 페이지로 리다이렉트
    if (axiosError.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Router.push('/login');
      return '로그인이 필요합니다.';
    }
    
    // 403 Forbidden
    if (axiosError.response.status === 403) {
      return '접근 권한이 없습니다.';
    }
    
    // 404 Not Found
    if (axiosError.response.status === 404) {
      return '요청한 리소스를 찾을 수 없습니다.';
    }
    
    // 422 Validation Error
    if (axiosError.response.status === 422) {
      const validationErrors = axiosError.response.data.error.details;
      if (validationErrors) {
        return Object.entries(validationErrors)
          .map(([field, errors]) => `${field}: ${errors}`)
          .join(', ');
      }
      return '입력값을 확인해주세요.';
    }
    
    // 서버 에러 응답이 있는 경우
    if (axiosError.response.data?.error) {
      return axiosError.response.data.error.message;
    }
    
    // 기본 HTTP 상태 메시지
    return getDefaultErrorMessage(axiosError.response.status);
  }
  
  // 일반 에러
  if (error instanceof Error) {
    return error.message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * HTTP 상태 코드에 따른 기본 에러 메시지
 */
const getDefaultErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return '잘못된 요청입니다.';
    case 409:
      return '이미 존재하는 리소스입니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    case 502:
      return '서버가 응답하지 않습니다.';
    case 503:
      return '서비스를 일시적으로 사용할 수 없습니다.';
    default:
      return `오류가 발생했습니다. (${status})`;
  }
};

/**
 * 에러 로깅 유틸리티
 */
export const logError = (error: unknown, context?: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'Error'}]`, error);
  }
  
  // TODO: 프로덕션 환경에서는 에러 트래킹 서비스로 전송
  // ex) Sentry, LogRocket 등
};