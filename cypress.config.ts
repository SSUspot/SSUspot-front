import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    
    env: {
      apiUrl: 'http://localhost:8080',
      testUser: {
        email: 'test@ssu.ac.kr',
        password: 'testPassword123!'
      }
    },
    
    setupNodeEvents(on, config) {
      // 테스트 환경 설정
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        clearDb() {
          // 테스트 DB 초기화 로직
          return null;
        }
      });
    },
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});