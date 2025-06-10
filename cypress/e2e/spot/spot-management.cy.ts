describe('Spot 관리 테스트', () => {
  beforeEach(() => {
    cy.createTestUser();
    cy.login();
  });

  describe('Spot 조회', () => {
    it('전체 Spot 목록을 조회할 수 있어야 함', () => {
      cy.visit('/main/map');
      
      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.wait('@getSpots');

      // 지도에 마커가 표시되는지 확인
      cy.get('[data-testid="spot-marker"]').should('have.length.greaterThan', 0);
    });

    it('Spot 정보를 확인할 수 있어야 함', () => {
      cy.visit('/main/map');
      
      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.wait('@getSpots');

      // 첫 번째 마커 클릭
      cy.get('[data-testid="spot-marker"]').first().click();

      // Spot 정보 오버레이 확인
      cy.get('[data-testid="spot-overlay"]').should('be.visible');
      cy.get('[data-testid="spot-name"]').should('be.visible');
      cy.get('[data-testid="spot-address"]').should('be.visible');
      cy.get('[data-testid="spot-info"]').should('be.visible');
    });

    it('Spot 상세 페이지로 이동할 수 있어야 함', () => {
      cy.visit('/main/map');
      
      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.wait('@getSpots');

      // 마커 클릭 후 상세보기
      cy.get('[data-testid="spot-marker"]').first().click();
      cy.get('[data-testid="view-spot-detail"]').click();

      // Spot 상세 페이지로 이동 확인
      cy.url().should('match', /\/main\/\d+/);
    });
  });

  describe('Spot 생성', () => {
    it('새로운 Spot을 생성할 수 있어야 함', () => {
      cy.visit('/spot');

      // Spot 정보 입력
      cy.get('input[name="spotName"]').type('테스트 스팟');
      cy.get('input[name="spotAddress"]').type('서울특별시 동작구 상도로 369');
      cy.get('textarea[name="spotInfo"]').type('테스트용 스팟입니다.');
      
      // 난이도 선택
      cy.get('select[name="spotLevel"]').select('2');

      // 좌표 설정 (지도 클릭 시뮬레이션)
      cy.get('[data-testid="map-container"]').click(400, 300);

      // 썸네일 이미지 업로드
      cy.intercept('POST', '**/api/images').as('uploadImage');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/spot-thumbnail.jpg', { force: true });
      cy.wait('@uploadImage');

      // Spot 생성
      cy.intercept('POST', '**/api/spots').as('createSpot');
      cy.get('button[type="submit"]').click();

      cy.wait('@createSpot').then((interception) => {
        expect(interception.response?.statusCode).to.equal(201);
      });

      // 생성 완료 메시지
      cy.contains('Spot이 생성되었습니다').should('be.visible');
    });

    it('필수 정보 없이 Spot 생성 시 에러 표시', () => {
      cy.visit('/spot');

      // 필수 정보 없이 제출
      cy.get('button[type="submit"]').click();

      // 에러 메시지 확인
      cy.contains('Spot 이름을 입력해주세요').should('be.visible');
      cy.contains('주소를 입력해주세요').should('be.visible');
      cy.contains('위치를 선택해주세요').should('be.visible');
    });
  });

  describe('Spot 기반 기능', () => {
    it('특정 Spot의 게시물만 필터링할 수 있어야 함', () => {
      cy.visit('/main/1'); // spotId = 1

      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.intercept('GET', '**/api/posts/spots/1**').as('getSpotPosts');
      
      cy.wait('@getSpots');
      cy.wait('@getSpotPosts');

      // 해당 Spot의 게시물만 표시되는지 확인
      cy.get('[data-testid="post-card"]').each(($el) => {
        cy.wrap($el).find('[data-testid="post-spot"]').should('have.attr', 'data-spot-id', '1');
      });
    });

    it('지도에서 Spot 선택 시 해당 게시물 목록 표시', () => {
      cy.visit('/main/map');

      cy.intercept('GET', '**/api/spots').as('getSpots');
      cy.wait('@getSpots');

      // 특정 Spot 마커 클릭
      cy.get('[data-testid="spot-marker"][data-spot-id="2"]').click();
      
      // 해당 Spot의 게시물 목록 표시
      cy.get('[data-testid="view-posts"]').click();

      cy.intercept('GET', '**/api/posts/spots/2**').as('getSpotPosts');
      cy.wait('@getSpotPosts');

      // URL 변경 확인
      cy.url().should('include', '/main/2');
    });
  });
});