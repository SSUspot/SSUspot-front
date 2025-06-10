import axios, { AxiosInstance, AxiosError } from 'axios';
import Router from 'next/router';
import { handleApiError, logError } from './errorHandler';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      config.headers['Authorization'] = `Bearer ${storedAccessToken}`;
    }

    return config;
  },
  (error) => {
    logError(error, 'Request Interceptor');
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // 401 에러이고 refresh token이 있는 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/users/refresh`,
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 - 로그인 페이지로 이동
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          Router.push('/login');
          return Promise.reject(refreshError);
        }
      }
    }

    // 에러 로깅
    logError(error, 'Response Interceptor');
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
