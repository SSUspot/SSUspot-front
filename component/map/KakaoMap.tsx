import { Map } from 'react-kakao-maps-sdk';
import React from 'react';
import MarkerContainer from './MarkerContainer';

import Spot from '../../type/spot';

const KakaoMap: React.FC<{
  spots: Spot[];
}> = ({ spots }) => {
  return (
    <>
      <div style={{ height: 'calc(100vh - 135px)' }}>
        <Map
          center={{ lat: 37.4944064, lng: 126.9599747 }}
          style={{ width: '100%', height: '100%' }}
        >
          {spots.map((spot, index) => (
            <MarkerContainer key={index} spot={spot} index={index} />
          ))}
        </Map>
      </div>
    </>
  );
};

export default KakaoMap;
