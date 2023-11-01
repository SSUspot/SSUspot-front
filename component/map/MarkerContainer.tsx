import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spotLevel: number;
  spotName: string;
  spotThumbnailImageLink: string;
}

const EventMarkerContainer: React.FC<{
  spot: Spot;
  index: number;
}> = ({ spot, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      key={index}
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
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && <div style={{ padding: '5px', color: '#000' }}> {spot.spotName} </div>}
    </MapMarker>
  );
};

export default EventMarkerContainer;
