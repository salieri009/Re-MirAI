# Re:MirAI 기획 문서

> **Re:MirAI 프로젝트 기획 단계 문서 모음**

**최종 업데이트:** 2025-11-28  
**버전:** 1.1.0  
**상태:** 개발 진행 중 (ver2 디자인 시스템 적용 완료)

---

## 📋 프로젝트 개요

Re:MirAI는 AI 기반 성격 발견 플랫폼으로, 친구들의 익명 피드백을 통해 "다른 사람들이 나를 어떻게 보는가?"라는 질문에 답합니다.

---

## 📚 문서 구조

### 프로젝트 핵심 문서

**[02-project-overview/](02-project-overview/)** - 프로젝트 기획 핵심 문서

- **[README.md](02-project-overview/README.md)** - 프로젝트 개요 네비게이션
- **[01-Project-Goals.md](02-project-overview/01-Project-Goals.md)** - 프로젝트 비전, 목표, 타겟 사용자
- **[02-Core-Features.md](02-project-overview/02-Core-Features.md)** - 기능 정의서 및 요구사항 명세
- **[03-Design-Philosophy.md](02-project-overview/03-Design-Philosophy.md)** - Blonix Branch 디자인 철학
- **[04-Roadmap.md](02-project-overview/04-Roadmap.md)** - 개발 로드맵 및 마일스톤

### UX 기획 문서

**[04-user-experience/](04-user-experience/)** - 사용자 경험 기획

- **[01-User-Journey-Map.md](04-user-experience/01-User-Journey-Map.md)** - 사용자 여정 맵
- **[02-User-Experience-Flows.md](04-user-experience/02-User-Experience-Flows.md)** - UX 플로우 다이어그램
- **[03-Page-Concepts.md](04-user-experience/03-Page-Concepts.md)** - 페이지별 컨셉 정의
- **[04-Heuristic-Improvements.md](04-user-experience/04-Heuristic-Improvements.md)** - UX 휴리스틱 개선사항

### 디자인 및 마케팅 기획

**[03-planning/](03-planning/)** - 디자인 및 마케팅 전략

- **[01-UI-UX-Design.md](03-planning/01-UI-UX-Design.md)** - UI/UX 디자인 기획
- **[02-Experience-Design-Document.md](03-planning/02-Experience-Design-Document.md)** - 경험 디자인 문서
- **[03-Viral-Marketing-Strategy.md](03-planning/03-Viral-Marketing-Strategy.md)** - 바이럴 마케팅 전략
- **[04-Asset-Specification.md](03-planning/04-Asset-Specification.md)** - 디자인 에셋 사양

### UX 분석 문서

**[05-analysis/](05-analysis/)** - UX/UI 전문가 분석

- **[01-Nielsen-Heuristics-Audit.md](05-analysis/01-Nielsen-Heuristics-Audit.md)** - Nielsen 휴리스틱 감사
- **[02-UX-UI-Expert-Analysis.md](05-analysis/02-UX-UI-Expert-Analysis.md)** - UX/UI 전문가 분석
- **[page-analysis/](05-analysis/page-analysis/)** - 페이지별 상세 분석 (8개 파일)

### 팀 구성

**[06-team/](06-team/)** - 팀 역할 및 역량

- **[01-Roles-And-Competencies.md](06-team/01-Roles-And-Competencies.md)** - 팀 역할 정의 및 필요 역량

### 레거시 기획 문서

**[01-concept/](01-concept/)** - 초기 기획 문서 (참고용)

- **[01-Blonix-Priority.md](01-concept/01-Blonix-Priority.md)** - Blonix Branch 우선순위
- **[02-Project-Plan.md](01-concept/02-Project-Plan.md)** - 초기 프로젝트 계획

### 참고 자료

- **[01-Glossary.md](01-Glossary.md)** - 프로젝트 용어 정의

### 디자인 개선 문서

**[07-Enhancement/](07-Enhancement/)** - 디자인 시스템 개선 문서

#### ver2 (현재 적용 중)
**[ver2/](07-Enhancement/ver2/)** - Version 2 "Digital Mirror" 디자인 시스템

- **[README.md](07-Enhancement/ver2/README.md)** - ver2 개선 사항 개요 및 구현 상태
- **[00-FRONTEND-REFACTORING-MASTER-PLAN.md](07-Enhancement/ver2/00-FRONTEND-REFACTORING-MASTER-PLAN.md)** - 프론트엔드 리팩토링 마스터 플랜
- **페이지별 개선 문서:**
  - 01-Landing-Page-Enhancement.md
  - 02-Login-Page-Enhancement.md
  - 03-Dashboard-Page-Enhancement.md
  - 04-Chat-Page-Enhancement.md
  - 05-Persona-Room-Page-Enhancement.md
  - 06-Survey-Hub-Page-Enhancement.md
  - 07-Summoning-Page-Enhancement.md
  - 08-Survey-Page-Enhancement.md
- **디자인 시스템:**
  - 09-Color-Palette-Plan.md (3-color system)
  - 10-4px-Baseline-Grid-System.md
  - 11-Typography-System.md (Space Grotesk)
- **기술 문서:**
  - 13-Frontend-Audit.md
  - 14-Frontend-Compliance-Report.md
  - 15-Backend-Engineering-Guide.md

#### ver1 (레거시)
**[ver1/](07-Enhancement/ver1/)** - Version 1 개선 문서 (참고용)

### 연결 및 배포 전략

**[08-Connectivity-and-Deployment/](08-Connectivity-and-Deployment/)** - 프론트엔드/백엔드 연결과 배포 파이프라인 문서

- **[README.md](08-Connectivity-and-Deployment/README.md)** - 연결 및 배포 문서 개요
- **[01-Frontend-Backend-Connectivity-Test-Plan.md](08-Connectivity-and-Deployment/01-Frontend-Backend-Connectivity-Test-Plan.md)**  
  - `02-Core-Features.md`에 정의된 F-001~F-006 기능을 직접 인용하여 각 테스트 케이스와 연결
- **[02-Pipeline-Strategy.md](08-Connectivity-and-Deployment/02-Pipeline-Strategy.md)**  
  - `01-Project-Goals.md`의 "Create an engaging and shareable experience…" 목표를 기반으로 배포/롤백 전략을 정렬
- **[03-Deployment-Guide.md](08-Connectivity-and-Deployment/03-Deployment-Guide.md)** - 배포 가이드

---

## 🎯 빠른 네비게이션

### 역할별 문서

**프로덕트 매니저**
1. [프로젝트 목표](02-project-overview/project-goals.md) - 비전 및 전략
2. [핵심 기능](02-project-overview/core-features.md) - 기능 명세
3. [로드맵](02-project-overview/roadmap.md) - 타임라인 및 마일스톤

**디자이너**
1. [디자인 철학](02-project-overview/design-philosophy.md) - Blonix Branch 원칙
2. [UI/UX 디자인](plan/ui_ux_design.md) - 디자인 기획
3. [사용자 여정](frontend/user_journey_map.md) - 사용자 플로우

**기획자**
1. [프로젝트 개요](02-project-overview/README.md) - 전체 개요
2. [핵심 기능](02-project-overview/core-features.md) - 기능 정의
3. [마케팅 전략](plan/viral_marketing_strategy.md) - 성장 전략

---

## 📊 프로젝트 현황

**현재 단계:** 개발 진행 중 (ver2 디자인 시스템 적용 완료)  
**다음 단계:** 프론트엔드-백엔드 통합 테스트  
**타겟 사용자:** 1,000명 (베타)  
**핵심 기능:** 100% 정의 완료  
**ver2 디자인:** ✅ 완료 (모든 페이지 구현 완료)

---

## 💡 핵심 가치 제안

**사용자를 위한 가치:**
- 🔍 다른 사람들이 나를 어떻게 보는지 발견
- 💬 외부 성격을 반영한 AI와 대화
- 🤝 관계 역학 이해 (호환성 매칭)
- 🎮 게임화된 자기 발견 경험

**플랫폼 가치:**
- 🚀 소셜 공유를 통한 바이럴 성장
- ♻️ 호환성 기능을 통한 네트워크 효과
- 💰 프리미엄 기능을 통한 수익화
- 🌟 AI 성격 분석 시장에서의 차별화

---

## 🎨 디자인 원칙

Re:MirAI는 **ver2 "Digital Mirror"** 디자인 시스템을 적용합니다:

- **다크 테마** - Deep Space (#0A0112) 배경, 몰입감 있는 경험
- **3-Color System** - Primary: Amethyst Purple (#845EC2), Accent: Mint Green (#00C9A7), Highlight: Light Lavender (#C197FF)
- **타이포그래피** - Space Grotesk (Display), Plus Jakarta Sans (Body)
- **4px Grid System** - 모든 간격이 4px의 배수
- **Glassmorphism** - 반투명 효과와 블러를 활용한 현대적 UI
- **접근성** - WCAG 2.1 AA 준수, reduced motion 지원

자세한 내용: 
- [디자인 철학](02-project-overview/03-Design-Philosophy.md)
- [ver2 디자인 시스템](07-Enhancement/ver2/README.md)

---

## 📝 문서 관리

**버전 이력:**
- 1.1.0 (2025-11-28) - ver2 디자인 시스템 문서 추가, 연결 및 배포 문서 추가
- 1.0.0 (2025-11-23) - 기획 단계 문서 정리 완료

**유지보수:**
- 월간 메트릭 및 진행상황 리뷰
- 분기별 로드맵 업데이트
- 지속적인 기능 명세 업데이트

---

**문의:** kordalek@naver.com  
**프로젝트 루트:** [README.md](../README.md)
