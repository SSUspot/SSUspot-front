import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ErrorBoundary from "@/component/common/ErrorBoundary";
import { ToastProvider } from "@/component/common/ToastProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    // 로그인이 필요하지 않은 페이지들
    const publicPages = ['/login', '/join'];
    const isPublicPage = publicPages.includes(router.pathname);
    
    if (!isPublicPage) {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedAccessToken) {
        void router.push("/login");
      }
    }
  }, [router.pathname]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
