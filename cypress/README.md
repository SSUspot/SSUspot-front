# SSUspot E2E 테스트 가이드

## 개요
이 문서는 SSUspot 프론트엔드의 E2E(End-to-End) 테스트 구현 및 실행 방법을 설명합니다.

## 테스트 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.test` 파일을 생성하고 다음 내용을 추가합니다:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_KAKAO_MAPS_API_KEY=your_test_api_key
```

### 3. 백엔드 서버 실행
테스트를 실행하기 전에 백엔드 서버가 실행 중이어야 합니다:
```bash
cd ../SSUspot-back/sns
./gradlew bootRun
```

## 테스트 실행

### 대화형 모드로 실행
```bash
npm run test:e2e:open
```

### 헤드리스 모드로 실행
```bash
npm run test:e2e
```

### CI 환경에서 실행
```bash
npm run test:e2e:ci
```

## 테스트 구조

```
cypress/
├── e2e/                    # E2E 테스트 파일
│   ├── auth/              # 인증 관련 테스트
│   │   ├── login.cy.ts
│   │   └── register.cy.ts
│   ├── post/              # 게시물 관련 테스트
│   │   ├── post-crud.cy.ts
│   │   └── comment.cy.ts
│   ├── spot/              # Spot 관련 테스트
│   │   └── spot-management.cy.ts
│   └── user/              # 사용자 관련 테스트
│       └── profile.cy.ts
├── fixtures/              # 테스트 데이터
│   └── comments.json
├── support/               # 헬퍼 함수 및 커맨드
│   ├── commands.ts
│   └── e2e.ts
└── README.md
```

## 주요 테스트 시나리오

### 1. 인증 (Authentication)
- **로그인**: 유효한/무효한 자격증명으로 로그인
- **회원가입**: 새 계정 생성, 중복 검증
- **토큰 관리**: 액세스/리프레시 토큰 저장 및 갱신

### 2. 게시물 (Posts)
- **CRUD 작업**: 생성, 조회, 수정, 삭제
- **이미지 업로드**: 다중 이미지 첨부
- **태그 관리**: 태그 추가/제거
- **필터링**: Spot별 게시물 필터링

### 3. 댓글 (Comments)
- **댓글 작성**: 게시물에 댓글 추가
- **댓글 수정/삭제**: 자신의 댓글 관리
- **실시간 업데이트**: 새 댓글 표시

### 4. Spot 관리
- **Spot 조회**: 지도에서 마커 표시
- **Spot 생성**: 새로운 장소 추가
- **Spot 기반 필터링**: 특정 Spot의 게시물 조회

### 5. 사용자 프로필
- **프로필 조회**: 마이페이지 표시
- **프로필 수정**: 닉네임, 프로필 이미지 변경
- **팔로우/언팔로우**: 다른 사용자 팔로우

## 커스텀 커맨드

### `cy.login(email?, password?)`
테스트 사용자로 로그인합니다.

### `cy.createTestUser()`
테스트용 사용자 계정을 생성합니다.

### `cy.mockApiResponse(method, url, response, status?)`
API 응답을 모킹합니다.

### `cy.waitForApi(alias)`
특정 API 호출을 기다립니다.

## 테스트 작성 가이드

### 1. 페이지 객체 패턴 사용
```typescript
// 나쁜 예
cy.get('input[type="email"]').type('test@example.com');

// 좋은 예
cy.get('[data-testid="email-input"]').type('test@example.com');
```

### 2. 명시적 대기 사용
```typescript
// API 응답 대기
cy.intercept('GET', '**/api/posts').as('getPosts');
cy.wait('@getPosts');
```

### 3. 테스트 격리
각 테스트는 독립적으로 실행될 수 있어야 합니다:
```typescript
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
```

## 디버깅

### 1. 스크린샷
실패한 테스트는 자동으로 스크린샷을 저장합니다:
```
cypress/screenshots/
```

### 2. 비디오 녹화
테스트 실행 과정이 비디오로 저장됩니다:
```
cypress/videos/
```

### 3. 개발자 도구
대화형 모드에서 브라우저 개발자 도구를 사용할 수 있습니다.

## CI/CD 통합

### GitHub Actions 예시
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd SSUspot-front
          npm ci
          
      - name: Start backend
        run: |
          cd SSUspot-back/sns
          ./gradlew bootRun &
          sleep 30
          
      - name: Run E2E tests
        run: |
          cd SSUspot-front
          npm run test:e2e:ci
          
      - name: Upload artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-artifacts
          path: |
            cypress/screenshots
            cypress/videos
```

## 문제 해결

### 1. 테스트가 타임아웃되는 경우
- 백엔드 서버가 실행 중인지 확인
- 네트워크 지연 시간 증가: `cypress.config.ts`에서 `defaultCommandTimeout` 조정

### 2. 요소를 찾을 수 없는 경우
- `data-testid` 속성이 올바르게 추가되었는지 확인
- 비동기 렌더링을 위한 대기 시간 추가

### 3. API 모킹이 작동하지 않는 경우
- 인터셉트 URL 패턴이 정확한지 확인
- 네트워크 탭에서 실제 요청 URL 확인