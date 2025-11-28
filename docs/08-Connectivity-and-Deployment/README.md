# 08. Connectivity & Deployment Docs

이 디렉토리는 Re:MirAI 프론트엔드 ↔ 백엔드 연결과 배포 파이프라인을 정리한 운영 문서를 보관합니다.  
`docs/02-project-overview/02-Core-Features.md`에서 정의된 F-001~F-006 기능, 그리고 `01-Project-Goals.md`의 비전을 그대로 인용해 연동성을 보장합니다.

---

## 문서 목록

1. **[01-Frontend-Backend-Connectivity-Test-Plan.md](01-Frontend-Backend-Connectivity-Test-Plan.md)**  
   - “Each feature file includes use cases, functional requirements (FR), and non-functional requirements (NFR).” — `02-Core-Features.md`  
   - 테스트 매트릭스로 F-001 (Survey)부터 F-006 (Gamification)까지 직접 연결하여, 각 API 흐름이 명세와 일치하는지 확인합니다.

2. **[02-Pipeline-Strategy.md](02-Pipeline-Strategy.md)**  
   - “Create an engaging and shareable experience where users can discover and interact with an AI representation of their public persona…” — `01-Project-Goals.md`  
   - 위 목표를 충족하기 위해 CI/CD, 롤백, 피처 플래그 전략을 정의하고 `04-Roadmap.md`의 단계별 마일스톤과 연동합니다.

---

## 사용 방법

- 새 기능/배포 흐름을 추가할 때는 먼저 `02-project-overview`에서 관련 기능이나 목표를 인용한 뒤, 해당 내용을 여기서 어떻게 검증/배포하는지 업데이트하세요.
- 배포 전에는 `01` 문서의 스모크 테스트를 실행하고, `02` 문서의 게이트(블루/그린, 피처 플래그 등)를 따라야 합니다.

---

**Last Updated:** 2025-11-27  
**Maintainer:** Platform & DevOps Team 


