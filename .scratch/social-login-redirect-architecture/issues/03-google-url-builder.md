# 03: Google URL builder 이식

**What to build:** 패키지 사용자가 기존 Google 입력으로 authorization URL을 만들 때, Google endpoint와 기본 response type을 유지하면서 공통 query serialization을 사용하도록 합니다.

**Blocked by:** 01: 공통 query serializer와 LINE URL builder 이식

**Status:** ready-for-human

- [x] Google authorization URL의 origin, pathname, 기본 response type이 기존 public contract와 동일하다.
- [x] 기존 Google public 입력이 provider query 이름으로 정상 직렬화된다.
- [x] scope, state, redirect URI 등 주요 query 값이 URL encoding을 거쳐 보존된다.
- [x] Google URL builder 테스트가 내부 helper 호출이 아니라 반환 URL의 외부 동작을 검증한다.
- [x] 기존 Google login redirect와 public export가 변경되지 않는다.
- [x] 기존 package lint, build, Node test workflow가 통과한다.

## Comments

### 2026-08-21

- `social-login-redirect/src/google-login.ts`가 provider endpoint와 기본 `response_type`을 유지하면서 공통 `makeUrlWithQuery`를 사용하도록 변경했습니다.
- Google public 입력 이름과 query 이름을 유지하고, callback URI 내부 query·scope·state encoding 및 `undefined` optional input 생략을 검증했습니다.
- 테스트는 내부 helper 호출이 아니라 `makeGoogleLoginUrl` 반환 URL을 parsed URL 기준으로 확인합니다.
- `pnpm --dir social-login-redirect lint`, `pnpm --dir social-login-redirect exec tsc --noEmit`, `pnpm --dir social-login-redirect test`가 통과했습니다. Node test는 5/5 통과했습니다.
- 커밋: `5fd92d7` (`refactor(social-login-redirect): share Google query serialization`)
- 브라우저 기반 live Google OAuth 인증과 실제 provider 수락 여부는 검증하지 않았습니다.
- 이번 커밋에는 Google 구현·테스트 두 파일만 포함했으며, 기존 unrelated dirty worktree 변경은 보존했습니다.
