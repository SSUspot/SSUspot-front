import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=56e45c147a8df3b30d57a33f5378f3d3&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
