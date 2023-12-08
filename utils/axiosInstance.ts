import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://ssuspot.online',
  headers: {
    Authorization: '',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const storedAccessToken = localStorage.getItem('accessToken');

  if (storedAccessToken) {
    config.headers['Authorization'] = `Bearer ${storedAccessToken}`;
  }

  return config;
});

export default axiosInstance;
