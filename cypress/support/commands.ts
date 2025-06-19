/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
      logout(): Chainable<void>
      createTestUser(): Chainable<void>
      mockApiResponse(method: string, url: string, response: any, status?: number): Chainable<void>
      waitForApi(alias: string): Chainable<void>
    }
  }
}

// 로그인 커맨드
Cypress.Commands.add('login', (email?: string, password?: string) => {
  const testEmail = email || Cypress.env('testUser').email;
  const testPassword = password || Cypress.env('testUser').password;

  cy.request('POST', `${Cypress.env('apiUrl')}/api/users/login`, {
    email: testEmail,
    password: testPassword
  }).then((response) => {
    window.localStorage.setItem('accessToken', response.body.accessToken);
    window.localStorage.setItem('refreshToken', response.body.refreshToken);
  });
});

// 로그아웃 커맨드
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  cy.visit('/login');
});

// 테스트 유저 생성
Cypress.Commands.add('createTestUser', () => {
  const testUser = Cypress.env('testUser');
  
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/users/register`,
    body: {
      email: testUser.email,
      password: testUser.password,
      userName: 'Test User',
      nickname: 'testuser',
      profileMessage: 'Test user for E2E testing'
    },
    failOnStatusCode: false
  });
});

// API 응답 모킹
Cypress.Commands.add('mockApiResponse', (method: string, url: string, response: any, status = 200) => {
  cy.intercept(method as any, url, {
    statusCode: status,
    body: response
  });
});

// API 호출 대기
Cypress.Commands.add('waitForApi', (alias: string) => {
  cy.wait(`@${alias}`);
});

export {};