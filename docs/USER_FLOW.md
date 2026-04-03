# Re:MirAI USER FLOW

## 1. End-to-End 플로우
1. Discovery: 공유된 카드/링크를 통해 유입
2. Auth: OAuth 로그인(구글/카카오/애플)
3. Create Ritual: 설문 생성 및 공유
4. Collect Responses: 익명 응답 수집
5. Summon Persona: 최소 응답 충족 시 합성
6. Bond: 페르소나와 채팅 (Bond Level 점진적 상승)
7. Share: 결과 카드 공유 → 재유입 루프
8. Social: 타인의 페르소나 룸 방문 및 호환성(Compatibility) 확인
9. Gamification: 일일/주간 퀘스트 달성 및 재화(Crystal) 보상 수령

## 2. 핵심 상태 전이
### Survey
- COLLECTING -> READY -> COMPLETED -> ARCHIVED
- READY 조건: response_count >= minResponses

### Persona
- Draft(내부) -> Active
- Active 이후 채팅/공유 진입 가능

### Gamification (Quest)
- ACTIVE -> COMPLETED -> CLAIMED
- 리셋 주기: Daily (매일 KST 00:00), Weekly (매주 월요일 KST 00:00)

## 3. 주요 사용자 시나리오
### A. 첫 사용자
- 로그인 -> 설문 생성 -> 링크 공유 -> 응답 3개 이상 수집 -> 합성 -> 채팅 시작 (초기 튜토리얼 퀘스트 병행)

### B. 응답자(비로그인)
- 공유 링크 진입 -> 공개 설문 확인 -> 익명 응답 제출 -> 작성 완료 화면 (플랫폼 온보딩 유도)

### C. 재방문 사용자 (리텐션 루프)
- 대시보드 진입 -> 리셋된 Daily/Weekly 퀘스트 확인 -> 페르소나와 일일 채팅(Bond Level 상승) -> 퀘스트 달성(COMPLETED) -> 보상 수령(CLAIMED) 및 Wallet 갱신

### D. 소셜 상호작용 사용자
- 타인의 페르소나 카드/링크 탭 -> 대상 유저의 공개 Room 조회 -> 내 페르소나와 호환성(Harmony, Balanced 등 라벨링) 점수 및 궁합 결과 확인

## 4. 오류/예외 플로우
- 유효하지 않은 설문 링크: Not Found 안내 + 홈으로 이동
- 응답 불가 상태(만료/종료): 불가능한 이유에 대한 UI 상태 안내
- 합성 실패(OpenAI 오류): 오류 toast 표출 및 재시도(Retry) 버튼 제공
- 소셜 조회 실패: 타겟 페르소나가 삭제되었거나 비공개일 경우 NotFound 화면(404) 처리 후 내 페르소나 룸 복귀 유도
- 퀘스트 보상 수령 오류: 조건 미달성(ACTIVE) 혹은 사전 수령 완료(CLAIMED) 시 버튼 비활성화 (혹은 클릭 시 에러 toast)
- 인증 만료: refresh 시도 후 최종 실패 시 매끄럽게 로그인 페이지(Auth)로 유도

## 5. UX 원칙
- 단계별 진행상태를 항상 노출
- 핵심 CTA는 1개만 강조
- 공유를 방해하는 입력/설정을 최소화
