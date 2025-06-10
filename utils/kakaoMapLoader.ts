declare global {
  interface Window {
    kakao: any;
  }
}

export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;
    
    if (!apiKey) {
      reject(new Error('Kakao Maps API key is not configured'));
      return;
    }

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };

    script.onerror = () => {
      reject(new Error('Failed to load Kakao Maps script'));
    };

    document.head.appendChild(script);
  });
};