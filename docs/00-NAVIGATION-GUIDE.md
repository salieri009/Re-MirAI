# Re:MirAI Documentation Navigation Guide
# 문서 읽기 가이드 (독자별 맞춤형)

**Version:** 1.0.0  
**Last Updated:** 2025-11-25  
**작성자:** Technical Documentation Team

---

## 📚 문서 구조 개요 (Documentation Structure)

```
docs/
├── 01-concept/              # 개념 및 비전
├── 02-project-overview/     # 프로젝트 전체 개요 및 기능 명세
├── 03-planning/             # 기획 및 설계
├── 04-user-experience/      # UX 설계
├── 05-analysis/             # 분석 자료
└── 06-team/                 # 팀 구성
```

---

## 🎯 독자별 읽기 순서 (Reading Guide by Role)

### 1. 제품 기획자 (Product Manager)

**목적:** 제품의 비전, 기능, UX 흐름 이해

#### 필수 읽기 순서:
1. **`02-project-overview/01-Executive-Summary.md`**
   - 제품의 핵심 가치 제안 이해
   - 3분 읽기

2. **`04-user-experience/01-User-Journey-Map.md`**
   - 사용자의 전체 여정 파악
   - 각 단계별 감정과 터치포인트 이해
   - 15분 읽기

3. **`04-user-experience/02-User-Experience-Flows.md`**
   - 주요 사용자 플로우 상세 파악
   - 에러 처리 및 대안 경로 확인
   - 20분 읽기

4. **`02-project-overview/features/` (모든 .md 파일)**
   - F-001부터 F-006까지 순서대로
   - 각 기능의 요구사항과 우선순위 확인
   - 각 5분, 총 30분

5. **`03-planning/03-Viral-Marketing-Strategy.md`**
   - 성장 전략 및 KPI 이해
   - 10분 읽기

**총 소요 시간:** 약 1시간 20분

---

### 2. UX/UI 디자이너 (Designer)

**목적:** 디자인 시스템, 페이지 구조, 사용자 경험 설계

#### 필수 읽기 순서:
1. **`02-project-overview/03-Design-Philosophy.md`**
   - 디자인 철학 및 원칙 이해
   - Blonix Branch 컨셉 파악
   - 10분 읽기

2. **`03-planning/01-UI-UX-Design.md`**
   - 전체 UI/UX 전략
   - 컬러 팔레트, 타이포그래피
   - 바이럴 루프 디자인 이해
   - 15분 읽기

3. **`03-planning/02-Page-Architecture.md`**
   - 5개 핵심 페이지 구조
   - 각 페이지의 UI 패턴 및 컴포넌트
   - 20분 읽기

4. **`04-user-experience/03-Page-Concepts.md`**
   - 페이지별 디자인 컨셉
   - 정보 계층 구조
   - 15분 읽기

5. **`03-planning/04-Asset-Specification.md`**
   - 필요한 아트 에셋 목록
   - 이미지 규격 및 포맷
   - 10분 읽기

6. **`04-user-experience/02-User-Experience-Flows.md`**
   - 인터랙션 플로우 확인
   - 애니메이션 타이밍 참고
   - 15분 읽기

**총 소요 시간:** 약 1시간 25분

**디자인 작업 시 참고:**
- Figma/Sketch 작업 시 `03-planning/01-UI-UX-Design.md`의 Design Tokens 활용
- 컴포넌트 디자인 시 Atomic Design 계층 준수

---

### 3. 프론트엔드 개발자 (Frontend Developer)

**목적:** 기술 스택, 컴포넌트 구조, API 통합 이해

#### 필수 읽기 순서:
1. **`03-planning/09-Frontend-Development-Plan.md`**
   - 기술 스택 및 프로젝트 구조
   - 개발 단계별 계획
   - 30분 읽기

2. **`03-planning/05-Technical-Specification.md`**
   - 시스템 아키텍처 개요
   - 데이터 모델 이해
   - 20분 읽기

3. **`03-planning/06-API-Specification.md`**
   - RESTful API 엔드포인트
   - 요청/응답 스키마
   - 인증 및 에러 처리
   - 30분 읽기

4. **`02-project-overview/features/` (.typ 파일 우선)**
   - F-001-Survey-System.typ
   - F-002-Persona-Synthesis.typ
   - F-003-Chat-Interface.typ
   - 각 기능의 상세 요구사항
   - 각 15분, 총 45분

5. **`03-planning/08-Environment-Config.md`**
   - 환경 변수 설정
   - 개발/스테이징/프로덕션 구분
   - 15분 읽기

6. **`03-planning/01-UI-UX-Design.md`** (선택)
   - 컴포넌트 디자인 의도 이해
   - 10분 읽기

**총 소요 시간:** 약 2시간 30분

**개발 시작 전 체크리스트:**
- [ ] `.env.example` 파일 확인
- [ ] API Base URL 설정
- [ ] 디자인 토큰 CSS 변수 임포트
- [ ] Atomic Design 폴더 구조 생성

---

### 4. 백엔드 개발자 (Backend Developer)

**목적:** API 요구사항, 데이터 모델, 비즈니스 로직 이해

#### 필수 읽기 순서:
1. **`03-planning/06-API-Specification.md`**
   - 모든 API 엔드포인트 명세
   - 인증 방식 (JWT)
   - 에러 코드 정의
   - 40분 읽기

2. **`03-planning/07-Database-Schema.md`**
   - 전체 데이터베이스 스키마
   - 테이블 관계도
   - 인덱스 전략
   - 30분 읽기

3. **`03-planning/05-Technical-Specification.md`**
   - 시스템 아키텍처
   - 기술 스택 (NestJS, PostgreSQL)
   - 20분 읽기

4. **`02-project-overview/features/` (.typ 파일)**
   - F-001-Survey-System.typ
   - F-002-Persona-Synthesis.typ
   - 각 기능의 FR/NFR
   - 각 15분, 총 90분

5. **`03-planning/08-Environment-Config.md`**
   - 백엔드 환경 변수
   - Secrets 관리
   - 15분 읽기

**총 소요 시간:** 약 3시간 15분

**개발 시작 전 체크리스트:**
- [ ] PostgreSQL 설치 및 DB 생성
- [ ] Prisma 스키마 작성
- [ ] OpenAI API 키 발급
- [ ] Google OAuth Credentials 설정

---

### 5. QA/테스터 (QA Engineer)

**목적:** 테스트 시나리오 작성, 검증 포인트 파악

#### 필수 읽기 순서:
1. **`04-user-experience/02-User-Experience-Flows.md`**
   - 전체 사용자 플로우
   - Happy Path 및 Error Path
   - 30분 읽기

2. **`02-project-overview/features/` (모든 .md 파일)**
   - 각 기능의 Use Case
   - Functional Requirements
   - Non-Functional Requirements
   - 각 10분, 총 60분

3. **`03-planning/06-API-Specification.md`**
   - API 테스트 케이스 작성용
   - 에러 응답 코드 확인
   - 20분 읽기

4. **`04-user-experience/01-User-Journey-Map.md`**
   - 엔드투엔드 테스트 시나리오
   - 감정 변화 포인트 (UX 검증)
   - 15분 읽기

**총 소요 시간:** 약 2시간 5분

**테스트 시작 전 준비:**
- [ ] 각 Feature별 Test Plan 작성
- [ ] Edge Case 시나리오 리스트 작성
- [ ] Performance Benchmark 기준 확인 (NFR)

---

### 6. 프로젝트 매니저/리드 (Tech Lead / PM)

**목적:** 전체 프로젝트 이해, 일정 관리, 리스크 파악

#### 필수 읽기 순서:
1. **`README.md` (루트)**
   - 프로젝트 개요
   - 5분 읽기

2. **`02-project-overview/01-Executive-Summary.md`**
   - 핵심 비전 및 목표
   - 10분 읽기

3. **`02-project-overview/04-Roadmap.md`**
   - 개발 로드맵 및 마일스톤
   - 15분 읽기

4. **`03-planning/09-Frontend-Development-Plan.md`**
   - 프론트엔드 8주 일정
   - 리스크 및 대응 방안
   - 20분 읽기

5. **`02-project-overview/features/` (모든 .md 파일)**
   - 각 기능의 Priority 확인
   - P0, P1, P2 구분
   - 각 5분, 총 30분

6. **`03-planning/06-API-Specification.md`** (개요만)
   - API 복잡도 파악
   - 외부 의존성 확인 (OpenAI, Google OAuth)
   - 10분 읽기

**총 소요 시간:** 약 1시간 30분

---

## 📖 맥락별 읽기 가이드 (Reading by Context)

### 맥락 1: 첫 프로젝트 온보딩 (신규 팀원)

**Day 1 (2시간)**
1. `README.md` - 프로젝트 소개
2. `02-project-overview/01-Executive-Summary.md` - 비전 이해
3. `02-project-overview/03-Design-Philosophy.md` - 디자인 철학
4. `04-user-experience/01-User-Journey-Map.md` - 사용자 여정

**Day 2 (3시간)**
5. 본인 역할에 맞는 "독자별 읽기 순서" 진행

---

### 맥락 2: 특정 기능 개발 (Feature Development)

**예시: F-001 Survey System 개발**

1. **`02-project-overview/features/F-001-Survey-System.typ`**
   - 기능 상세 요구사항 (15분)

2. **`04-user-experience/02-User-Experience-Flows.md`**
   - "Survey Creation Flow" 섹션 (10분)

3. **`03-planning/06-API-Specification.md`**
   - "Survey Endpoints" 섹션 (15분)

4. **`03-planning/02-Page-Architecture.md`**
   - "Survey Page" 섹션 (10분)

**총 소요 시간:** 50분

---

### 맥락 3: UI 컴포넌트 개발

**예시: PersonaCard 컴포넌트**

1. **`04-user-experience/03-Page-Concepts.md`**
   - "F-004: Persona Room" 섹션 (5분)

2. **`03-planning/01-UI-UX-Design.md`**
   - "The Persona Card (The Viral Asset)" 섹션 (5분)

3. **`03-planning/02-Page-Architecture.md`**
   - "Persona Page" 섹션 (5분)

4. **`03-planning/09-Frontend-Development-Plan.md`**
   - "Persona Card Sharing" 섹션 (5분)

**총 소요 시간:** 20분

---

### 맥락 4: API 통합 작업

1. **`03-planning/06-API-Specification.md`**
   - 해당 엔드포인트 섹션 (10분)

2. **`02-project-overview/features/F-XXX-*.typ`**
   - API Specification 섹션 (5분)

3. **`03-planning/08-Environment-Config.md`**
   - 환경 변수 확인 (5분)

**총 소요 시간:** 20분

---

## 🗂️ 파일 타입별 용도 (File Type Purpose)

### `.md` 파일 (Markdown)
- **용도:** 빠른 참조, 개요 확인
- **독자:** 모든 팀원
- **특징:** 간결한 요약본

### `.typ` 파일 (Typst)
- **용도:** 상세 기술 명세, PDF 생성용
- **독자:** 개발자, QA
- **특징:** 완전한 기술 문서
- **PDF 생성:** `typst compile F-001-Survey-System.typ`

### 문서 우선순위
- **개발자:** `.typ` 파일 우선 → `.md` 참조
- **기획자/디자이너:** `.md` 파일 우선

---

## 🔄 문서 업데이트 주기 (Update Frequency)

| 문서 카테고리 | 업데이트 주기 | 책임자 |
|--------------|--------------|--------|
| 01-concept/ | 분기별 | Product Lead |
| 02-project-overview/ | 월별 or 기능 추가 시 | PM |
| 03-planning/ | 스프린트 시작 전 | Tech Lead |
| 04-user-experience/ | 분기별 or UX 변경 시 | UX Lead |

---

## ✅ 문서 읽기 체크리스트 (Reading Checklist)

### 개발 시작 전 (Before Development)
- [ ] 본인 역할에 맞는 "필수 읽기 순서" 완료
- [ ] 담당 기능의 .typ 파일 정독
- [ ] API Specification 해당 섹션 확인
- [ ] 환경 변수 설정 확인

### 기능 개발 중 (During Development)
- [ ] User Flow 문서 참조
- [ ] FR/NFR 요구사항 충족 확인
- [ ] 디자인 토큰 사용 여부 확인

### 리뷰/테스트 전 (Before Review)
- [ ] Use Case 시나리오 검증
- [ ] Error Handling 경로 테스트
- [ ] Accessibility 체크리스트 확인

---

## 📞 문서 관련 문의 (Documentation Support)

### 질문 유형별 담당자
- **내용 이해 질문:** Technical Writer에게 Slack DM
- **기획 의도 확인:** PM에게 문의
- **기술 구현 방법:** Tech Lead에게 문의

### 문서 개선 제안
- GitHub Issue 생성: `[DOCS] 제목`
- 직접 PR: `docs/` 경로 수정 후 PR

---

**마지막 업데이트:** 2025-11-25  
**문서 버전:** 1.0.0  
**다음 리뷰:** 2025-12-25
