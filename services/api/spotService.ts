import axiosInstance from '@/utils/axiosInstance';
import { CreateSpotRequest } from '@/type/api/request';
import { SpotResponse } from '@/type/api/response';
import Spot from '@/type/spot';

export const spotService = {
  /**
   * 모든 스팟 조회
   */
  async getAllSpots(): Promise<Spot[]> {
    const response = await axiosInstance.get('/api/spots');
    return response.data.map((spotResponse: SpotResponse): Spot => ({
      id: spotResponse.id,
      spotName: spotResponse.spotName,
      spotThumbnailImageLink: spotResponse.spotThumbnailImageLink,
      spotAddress: spotResponse.spotAddress,
      spotInfo: spotResponse.spotInfo,
      spotLevel: spotResponse.spotLevel,
      latitude: spotResponse.latitude,
      longitude: spotResponse.longitude,
    }));
  },

  /**
   * 특정 스팟 조회
   */
  async getSpot(spotId: number): Promise<Spot> {
    const response = await axiosInstance.get(`/api/spots/${spotId}`);
    const spotResponse: SpotResponse = response.data;
    return {
      id: spotResponse.id,
      spotName: spotResponse.spotName,
      spotThumbnailImageLink: spotResponse.spotThumbnailImageLink,
      spotAddress: spotResponse.spotAddress,
      spotInfo: spotResponse.spotInfo,
      spotLevel: spotResponse.spotLevel,
      latitude: spotResponse.latitude,
      longitude: spotResponse.longitude,
    };
  },

  /**
   * 새 스팟 생성
   */
  async createSpot(data: CreateSpotRequest): Promise<Spot> {
    const response = await axiosInstance.post('/api/spots', data);
    const spotResponse: SpotResponse = response.data;
    return {
      id: spotResponse.id,
      spotName: spotResponse.spotName,
      spotThumbnailImageLink: spotResponse.spotThumbnailImageLink,
      spotAddress: spotResponse.spotAddress,
      spotInfo: spotResponse.spotInfo,
      spotLevel: spotResponse.spotLevel,
      latitude: spotResponse.latitude,
      longitude: spotResponse.longitude,
    };
  },
};