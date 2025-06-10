describe('회원가입 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/join');
  });

  it('회원가입 페이지가 정상적으로 표시되어야 함', () => {
    cy.contains('회원가입').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="userName"]').should('be.visible');
    cy.get('input[name="nickname"]').should('be.visible');
  });

  it('모든 필수 정보로 회원가입 성공', () => {
    cy.intercept('POST', '**/api/users/register').as('registerRequest');

    const newUser = {
      email: `test${Date.now()}@ssu.ac.kr`,
      password: 'TestPassword123!',
      userName: '테스트유저',
      nickname: `testuser${Date.now()}`
    };

    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);
    cy.get('input[name="userName"]').type(newUser.userName);
    cy.get('input[name="nickname"]').type(newUser.nickname);
    
    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201);
    });

    // 로그인 페이지로 리다이렉트 확인
    cy.url().should('include', '/login');
    cy.contains('회원가입이 완료되었습니다').should('be.visible');
  });

  it('중복된 이메일로 회원가입 실패', () => {
    cy.intercept('POST', '**/api/users/register', {
      statusCode: 409,
      body: {
        error: {
          code: 'EMAIL_EXISTS',
          message: '이미 사용중인 이메일입니다.'
        }
      }
    }).as('registerRequest');

    cy.get('input[name="email"]').type('existing@ssu.ac.kr');
    cy.get('input[name="password"]').type('TestPassword123!');
    cy.get('input[name="userName"]').type('기존유저');
    cy.get('input[name="nickname"]').type('existinguser');
    
    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');
    
    // 에러 메시지 표시 확인
    cy.contains('이미 사용중인 이메일입니다.').should('be.visible');
  });

  it('프로필 이미지 업로드', () => {
    cy.intercept('POST', '**/api/images').as('uploadImage');
    
    // 파일 업로드 시뮬레이션
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });
    
    cy.wait('@uploadImage').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
    
    // 이미지 미리보기 확인
    cy.get('img[alt="Profile"]').should('be.visible');
  });
});