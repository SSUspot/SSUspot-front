import { Map, MapMarker } from 'react-kakao-maps-sdk';
import React, { useEffect, useState } from 'react';

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spotLevel: number;
  spotName: string;
  spotThumbnailImageLink: string;
}

const KakaoMap: React.FC<{
  spots: Spot[];
}> = ({ spots }) => {
  const [openStates, setOpenStates] = useState<boolean[]>(new Array(spots.length).fill(false));

  const handleMarkerMouseOver = (index: number) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = true;
    setOpenStates(updatedOpenStates);
  };

  const handleMarkerMouseOut = (index: number) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = false;
    setOpenStates(updatedOpenStates);
  };

  return (
    <>
      <div style={{ height: 'calc(100vh - 135px)' }}>
        <Map
          center={{ lat: 37.4944064, lng: 126.9599747 }}
          style={{ width: '100%', height: '100%' }}
        >
          {spots.map((spot, index) => (
            <MapMarker
              position={{ lat: spot.latitude, lng: spot.longitude }}
              image={{
                src: 'https://github.com/SSUspot/SSUspot-front/blob/feature/mainPages/public/Marker.png?raw=true',
                size: {
                  width: 48,
                  height: 64,
                },
                options: {
                  offset: {
                    x: 25,
                    y: 64,
                  },
                },
              }}
              onMouseOver={() => handleMarkerMouseOver(index)}
              onMouseOut={() => handleMarkerMouseOut(index)}
            >
              {openStates[index] && (
                <div style={{ padding: '5px', color: '#000' }}>{spot.spotName}</div>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
    </>
  );
};

export default KakaoMap;
