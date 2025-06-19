// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// 전역 테스트 설정
beforeEach(() => {
  // API 호출 인터셉트 설정
  cy.intercept('GET', '**/api/**').as('apiCall');
  
  // 로컬 스토리지 초기화
  cy.clearLocalStorage();
  
  // 쿠키 초기화
  cy.clearCookies();
});

// 테스트 실패 시 스크린샷 저장
Cypress.on('fail', (error, runnable) => {
  // 스크린샷 저장
  const parentTitle = runnable.parent?.title || 'unknown';
  cy.screenshot(`failed-${parentTitle}-${runnable.title}`);
  
  // 에러 재발생
  throw error;
});