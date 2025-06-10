describe('로그인 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('로그인 페이지가 정상적으로 표시되어야 함', () => {
    cy.contains('로그인').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('유효한 자격증명으로 로그인 성공', () => {
    cy.intercept('POST', '**/api/users/login').as('loginRequest');

    cy.get('input[type="email"]').type('test@ssu.ac.kr');
    cy.get('input[type="password"]').type('testPassword123!');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    // 메인 페이지로 리다이렉트 확인
    cy.url().should('include', '/main');
    
    // 토큰이 저장되었는지 확인
    cy.window().then((window) => {
      expect(window.localStorage.getItem('accessToken')).to.exist;
      expect(window.localStorage.getItem('refreshToken')).to.exist;
    });
  });

  it('잘못된 자격증명으로 로그인 실패', () => {
    cy.intercept('POST', '**/api/users/login', {
      statusCode: 400,
      body: {
        error: {
          code: 'INVALID_CREDENTIALS',
          message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        }
      }
    }).as('loginRequest');

    cy.get('input[type="email"]').type('wrong@ssu.ac.kr');
    cy.get('input[type="password"]').type('wrongPassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    
    // 에러 메시지 표시 확인
    cy.contains('이메일 또는 비밀번호가 올바르지 않습니다.').should('be.visible');
    
    // 로그인 페이지에 머물러 있는지 확인
    cy.url().should('include', '/login');
  });

  it('회원가입 링크가 작동해야 함', () => {
    cy.contains('회원가입').click();
    cy.url().should('include', '/join');
  });
});