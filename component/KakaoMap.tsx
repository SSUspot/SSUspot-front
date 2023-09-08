import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <>
      <div style={{ marginTop: "135px", height: "calc(100vh - 135px)" }}>
        <Map
          center={{ lat: 37.4944064, lng: 126.9599747 }}
          style={{ width: "100%", height: "100%" }}
        >
          <MapMarker position={{ lat: 37.4944064, lng: 126.9599747 }}>
            <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
        </Map>
      </div>
    </>
  );
};

export default KakaoMap;
