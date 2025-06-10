describe('사용자 프로필 테스트', () => {
  beforeEach(() => {
    cy.createTestUser();
    cy.login();
  });

  describe('마이페이지', () => {
    it('자신의 프로필을 볼 수 있어야 함', () => {
      cy.visit('/mypage');

      cy.intercept('GET', '**/api/users').as('getCurrentUser');
      cy.intercept('GET', '**/api/posts/users/me**').as('getMyPosts');

      cy.wait('@getCurrentUser');
      cy.wait('@getMyPosts');

      // 프로필 정보 확인
      cy.get('[data-testid="user-nickname"]').should('be.visible');
      cy.get('[data-testid="user-email"]').should('be.visible');
      cy.get('[data-testid="user-profile-image"]').should('be.visible');
      cy.get('[data-testid="user-profile-message"]').should('be.visible');
    });

    it('자신이 작성한 게시물 목록을 볼 수 있어야 함', () => {
      cy.visit('/mypage');

      cy.intercept('GET', '**/api/posts/users/me**').as('getMyPosts');
      cy.wait('@getMyPosts');

      // 게시물 목록 확인
      cy.get('[data-testid="my-post-item"]').should('have.length.greaterThan', 0);
      
      // 게시물 정보 확인
      cy.get('[data-testid="my-post-item"]').first().within(() => {
        cy.get('[data-testid="post-title"]').should('be.visible');
        cy.get('[data-testid="post-date"]').should('be.visible');
        cy.get('[data-testid="post-likes"]').should('be.visible');
      });
    });

    it('설정 페이지로 이동할 수 있어야 함', () => {
      cy.visit('/mypage');

      cy.get('[data-testid="settings-button"]').click();
      cy.url().should('include', '/setting');
    });
  });

  describe('프로필 수정', () => {
    it('프로필 정보를 수정할 수 있어야 함', () => {
      cy.visit('/setting');

      cy.intercept('GET', '**/api/users').as('getCurrentUser');
      cy.wait('@getCurrentUser');

      // 프로필 정보 수정
      cy.get('input[name="nickname"]').clear().type('새로운닉네임');
      cy.get('input[name="userName"]').clear().type('새로운이름');
      cy.get('textarea[name="profileMessage"]').clear().type('새로운 프로필 메시지입니다.');

      // 프로필 이미지 변경
      cy.intercept('POST', '**/api/images').as('uploadImage');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/new-profile.jpg', { force: true });
      cy.wait('@uploadImage');

      // 수정사항 저장
      cy.intercept('PATCH', '**/api/users').as('updateUser');
      cy.get('[data-testid="save-profile"]').click();

      cy.wait('@updateUser').then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
      });

      // 성공 메시지 확인
      cy.contains('프로필이 수정되었습니다').should('be.visible');
    });

    it('닉네임 중복 시 에러 메시지 표시', () => {
      cy.visit('/setting');

      cy.intercept('GET', '**/api/users').as('getCurrentUser');
      cy.wait('@getCurrentUser');

      // 중복된 닉네임 입력
      cy.get('input[name="nickname"]').clear().type('existinguser');

      cy.intercept('PATCH', '**/api/users', {
        statusCode: 409,
        body: {
          error: {
            code: 'NICKNAME_EXISTS',
            message: '이미 사용중인 닉네임입니다.'
          }
        }
      }).as('updateUser');

      cy.get('[data-testid="save-profile"]').click();
      cy.wait('@updateUser');

      // 에러 메시지 확인
      cy.contains('이미 사용중인 닉네임입니다.').should('be.visible');
    });
  });

  describe('팔로우 기능', () => {
    it('다른 사용자를 팔로우할 수 있어야 함', () => {
      // 다른 사용자의 게시물 페이지로 이동
      cy.visit('/posts/2');

      cy.intercept('GET', '**/api/posts/2').as('getPost');
      cy.wait('@getPost');

      // 팔로우 버튼 클릭
      cy.intercept('POST', '**/api/users/**/follow').as('followUser');
      cy.get('[data-testid="follow-button"]').click();

      cy.wait('@followUser').then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
      });

      // 버튼 텍스트 변경 확인
      cy.get('[data-testid="follow-button"]').should('contain', '팔로잉');
    });

    it('팔로우한 사용자를 언팔로우할 수 있어야 함', () => {
      cy.visit('/posts/2');

      cy.intercept('GET', '**/api/posts/2').as('getPost');
      cy.wait('@getPost');

      // 언팔로우 버튼 클릭 (이미 팔로우한 상태)
      cy.intercept('DELETE', '**/api/users/**/follow').as('unfollowUser');
      cy.get('[data-testid="follow-button"]').click();

      cy.wait('@unfollowUser').then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
      });

      // 버튼 텍스트 변경 확인
      cy.get('[data-testid="follow-button"]').should('contain', '팔로우');
    });
  });

  describe('로그아웃', () => {
    it('로그아웃할 수 있어야 함', () => {
      cy.visit('/mypage');

      cy.get('[data-testid="logout-button"]').click();

      // 토큰 삭제 확인
      cy.window().then((window) => {
        expect(window.localStorage.getItem('accessToken')).to.be.null;
        expect(window.localStorage.getItem('refreshToken')).to.be.null;
      });

      // 로그인 페이지로 리다이렉트 확인
      cy.url().should('include', '/login');
    });
  });
});