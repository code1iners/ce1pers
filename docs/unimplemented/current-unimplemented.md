# 현재 미구현 과제

이 문서는 현재 구현에 아직 반영되지 않았거나 결정이 필요한 항목만 관리합니다. 구현이 완료되면 해당 항목을 삭제하고 담당 README 또는 현재 계약 문서에 반영합니다.

## `window-helpers` 최신 로컬 버전 registry 발행 확인

- 상태: 결정 필요
- 대상 표면: `@ce1pers/window-helpers` package
- 현재 상태: 저장소 `package.json`은 `1.1.9`이고 npm latest는 `1.1.8`입니다.
- 필요성: 저장소 코드와 실제 설치 가능한 npm artifact의 버전을 일치시켜야 합니다.
- 구현 조건: `1.1.9`를 발행할지, 버전을 되돌릴지 결정하고 별도 registry 작업으로 승인합니다.
- 관련 근거:
  - [window-helpers package.json](../../window-helpers/package.json)
  - [window-helpers README](../../window-helpers/README.md)

## LINE 로그인 URL 파라미터 연결

- 상태: 미구현
- 대상 표면: `social-login-redirect`의 `makeLineLoginUrl`
- 현재 상태: 함수는 `Props`를 받지만 `URLSearchParams`에 값을 넣지 않아 빈 query string을 반환합니다.
- 필요성: LINE authorization URL은 `response_type`, `client_id`, `redirect_uri`, `state`, `scope`를 전달해야 합니다.
- 구현 조건: 구현 수정과 LINE provider URL 검증을 별도 승인하고, 수정 후 README 예제를 다시 타입 검사합니다.
- 관련 근거:
  - [line-login.ts](../../social-login-redirect/src/line-login.ts)
  - [social-login-redirect README](../../social-login-redirect/README.md)
