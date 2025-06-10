describe('게시물 CRUD 테스트', () => {
  beforeEach(() => {
    // 테스트 유저로 로그인
    cy.createTestUser();
    cy.login();
    cy.visit('/');
  });

  describe('게시물 작성', () => {
    it('새 게시물을 작성할 수 있어야 함', () => {
      // 게시물 작성 페이지로 이동
      cy.get('[data-testid="create-post-button"]').click();
      cy.url().should('include', '/posting');

      // Spot 선택
      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.wait('@getSpots');
      cy.get('[data-testid="spot-select"]').select('1');

      // 게시물 내용 입력
      cy.get('input[name="title"]').type('테스트 게시물 제목');
      cy.get('textarea[name="content"]').type('테스트 게시물 내용입니다.');

      // 태그 추가
      cy.get('input[name="tag"]').type('테스트태그{enter}');
      cy.get('input[name="tag"]').type('E2E테스트{enter}');

      // 이미지 업로드
      cy.intercept('POST', '**/api/images').as('uploadImage');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });
      cy.wait('@uploadImage');

      // 게시물 작성
      cy.intercept('POST', '**/api/posts').as('createPost');
      cy.get('button[type="submit"]').click();

      cy.wait('@createPost').then((interception) => {
        expect(interception.response?.statusCode).to.equal(201);
        const postId = interception.response?.body.id;
        
        // 작성된 게시물 페이지로 리다이렉트 확인
        cy.url().should('include', `/posts/${postId}`);
      });
    });

    it('필수 항목 없이 게시물 작성 시 에러 표시', () => {
      cy.visit('/posting');

      // 제목 없이 제출
      cy.get('button[type="submit"]').click();
      cy.contains('제목을 입력해주세요').should('be.visible');
    });
  });

  describe('게시물 조회', () => {
    it('게시물 목록을 조회할 수 있어야 함', () => {
      cy.visit('/main/list');
      
      cy.intercept('GET', '**/api/posts**').as('getPosts');
      cy.wait('@getPosts');

      // 게시물 카드가 표시되는지 확인
      cy.get('[data-testid="post-card"]').should('have.length.greaterThan', 0);
    });

    it('특정 Spot의 게시물을 필터링할 수 있어야 함', () => {
      cy.visit('/main/1'); // spotId = 1
      
      cy.intercept('GET', '**/api/posts/spots/1**').as('getSpotPosts');
      cy.wait('@getSpotPosts');

      // 해당 Spot의 게시물만 표시되는지 확인
      cy.get('[data-testid="post-card"]').each(($el) => {
        cy.wrap($el).should('contain', 'Spot 1');
      });
    });

    it('게시물 상세 정보를 볼 수 있어야 함', () => {
      cy.visit('/main/list');
      
      cy.intercept('GET', '**/api/posts**').as('getPosts');
      cy.wait('@getPosts');

      // 첫 번째 게시물 클릭
      cy.get('[data-testid="post-card"]').first().click();

      // 게시물 상세 정보 확인
      cy.get('[data-testid="post-title"]').should('be.visible');
      cy.get('[data-testid="post-content"]').should('be.visible');
      cy.get('[data-testid="post-author"]').should('be.visible');
      cy.get('[data-testid="post-date"]').should('be.visible');
    });
  });

  describe('게시물 수정', () => {
    it('자신의 게시물을 수정할 수 있어야 함', () => {
      // 자신의 게시물 페이지로 이동
      cy.visit('/posts/1'); // 테스트용 게시물 ID
      
      cy.intercept('GET', '**/api/posts/1').as('getPost');
      cy.wait('@getPost');

      // 수정 버튼 클릭
      cy.get('[data-testid="edit-post-button"]').click();

      // 수정 폼이 표시되는지 확인
      cy.get('input[name="title"]').should('have.value', '기존 제목');
      
      // 내용 수정
      cy.get('input[name="title"]').clear().type('수정된 제목');
      cy.get('textarea[name="content"]').clear().type('수정된 내용');

      // 수정 요청
      cy.intercept('PATCH', '**/api/posts/1').as('updatePost');
      cy.get('button[type="submit"]').click();

      cy.wait('@updatePost').then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
      });

      // 수정된 내용 확인
      cy.contains('수정된 제목').should('be.visible');
      cy.contains('수정된 내용').should('be.visible');
    });
  });

  describe('게시물 삭제', () => {
    it('자신의 게시물을 삭제할 수 있어야 함', () => {
      cy.visit('/posts/1');
      
      cy.intercept('GET', '**/api/posts/1').as('getPost');
      cy.wait('@getPost');

      // 삭제 버튼 클릭
      cy.get('[data-testid="delete-post-button"]').click();

      // 확인 모달
      cy.contains('정말 삭제하시겠습니까?').should('be.visible');
      
      // 삭제 확인
      cy.intercept('DELETE', '**/api/posts/1').as('deletePost');
      cy.get('[data-testid="confirm-delete"]').click();

      cy.wait('@deletePost').then((interception) => {
        expect(interception.response?.statusCode).to.equal(204);
      });

      // 목록 페이지로 리다이렉트 확인
      cy.url().should('include', '/main');
    });
  });
});