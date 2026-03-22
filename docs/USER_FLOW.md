# Re:MirAI USER FLOW

## 1. End-to-End 플로우
1. Discovery: 공유된 카드/링크를 통해 유입
2. Auth: OAuth 로그인(구글/카카오/애플)
3. Create Ritual: 설문 생성 및 공유
4. Collect Responses: 익명 응답 수집
5. Summon Persona: 최소 응답 충족 시 합성
6. Bond: 페르소나와 채팅
7. Share: 결과 카드 공유 → 재유입 루프

## 2. 핵심 상태 전이
### Survey
- COLLECTING -> READY -> COMPLETED -> ARCHIVED
- READY 조건: response_count >= minResponses

### Persona
- Draft(내부) -> Active
- Active 이후 채팅/공유 진입 가능

## 3. 주요 사용자 시나리오
### A. 첫 사용자
- 로그인 -> 설문 생성 -> 링크 공유 -> 응답 3개 이상 수집 -> 합성 -> 채팅 시작

### B. 응답자(비로그인)
- 공유 링크 진입 -> 공개 설문 확인 -> 익명 응답 제출 -> 완료

### C. 재방문 사용자
- 대시보드 진입 -> 진행 중 설문 상태 확인 -> 페르소나/채팅 재진입

## 4. 오류/예외 플로우
- 유효하지 않은 설문 링크: Not Found 안내 + 홈 이동
- 응답 불가 상태(만료/종료): 상태 안내
- 합성 실패(OpenAI 오류): 재시도 버튼 + 안내 문구
- 인증 만료: refresh 시도 후 실패 시 로그인 유도

## 5. UX 원칙
- 단계별 진행상태를 항상 노출
- 핵심 CTA는 1개만 강조
- 공유를 방해하는 입력/설정을 최소화
