describe('댓글 기능 테스트', () => {
  beforeEach(() => {
    cy.createTestUser();
    cy.login();
    cy.visit('/posts/1'); // 테스트용 게시물
  });

  it('댓글을 작성할 수 있어야 함', () => {
    cy.intercept('GET', '**/api/posts/1/comments**').as('getComments');
    cy.wait('@getComments');

    // 댓글 입력
    cy.get('[data-testid="comment-input"]').type('테스트 댓글입니다.');
    
    // 댓글 작성
    cy.intercept('POST', '**/api/posts/1/comments').as('createComment');
    cy.get('[data-testid="comment-submit"]').click();

    cy.wait('@createComment').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201);
    });

    // 작성된 댓글 확인
    cy.contains('테스트 댓글입니다.').should('be.visible');
  });

  it('댓글 목록을 볼 수 있어야 함', () => {
    cy.intercept('GET', '**/api/posts/1/comments**', {
      fixture: 'comments.json'
    }).as('getComments');

    cy.wait('@getComments');

    // 댓글 목록 확인
    cy.get('[data-testid="comment-item"]').should('have.length.greaterThan', 0);
    
    // 댓글 정보 확인
    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('[data-testid="comment-author"]').should('be.visible');
      cy.get('[data-testid="comment-content"]').should('be.visible');
      cy.get('[data-testid="comment-date"]').should('be.visible');
    });
  });

  it('자신의 댓글을 수정할 수 있어야 함', () => {
    // 자신의 댓글이 있는 게시물 로드
    cy.intercept('GET', '**/api/posts/1/comments**').as('getComments');
    cy.wait('@getComments');

    // 수정 버튼 클릭
    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('[data-testid="edit-comment"]').click();
    });

    // 수정 입력란 표시 확인
    cy.get('[data-testid="comment-edit-input"]').should('be.visible');
    
    // 댓글 수정
    cy.get('[data-testid="comment-edit-input"]').clear().type('수정된 댓글입니다.');
    
    cy.intercept('PATCH', '**/api/posts/1/comments/**').as('updateComment');
    cy.get('[data-testid="save-comment"]').click();

    cy.wait('@updateComment').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    // 수정된 댓글 확인
    cy.contains('수정된 댓글입니다.').should('be.visible');
  });

  it('자신의 댓글을 삭제할 수 있어야 함', () => {
    cy.intercept('GET', '**/api/posts/1/comments**').as('getComments');
    cy.wait('@getComments');

    // 삭제 버튼 클릭
    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('[data-testid="delete-comment"]').click();
    });

    // 삭제 확인
    cy.intercept('DELETE', '**/api/posts/1/comments/**').as('deleteComment');
    cy.get('[data-testid="confirm-delete"]').click();

    cy.wait('@deleteComment').then((interception) => {
      expect(interception.response?.statusCode).to.equal(204);
    });

    // 댓글이 삭제되었는지 확인
    cy.get('[data-testid="comment-item"]').should('have.length.lessThan', 5);
  });

  it('빈 댓글은 작성할 수 없어야 함', () => {
    // 빈 상태로 제출
    cy.get('[data-testid="comment-submit"]').click();
    
    // 에러 메시지 확인
    cy.contains('댓글 내용을 입력해주세요').should('be.visible');
  });
});