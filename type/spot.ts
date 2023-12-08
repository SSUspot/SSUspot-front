interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spotLevel: number;
  spotName: string;
  spotImage: string;
  spotAddress: string;
  spotTag: string[];
  spotInfo: string;
}

export default Spot;
