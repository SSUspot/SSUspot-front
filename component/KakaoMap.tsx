import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <>
      <Map
        center={{ lat: 37.4944064, lng: 126.9599747 }}
        style={{ width: "100%", height: "500px" }}
      >
        {/* <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker> */}
      </Map>
    </>
  );
};

export default KakaoMap;
