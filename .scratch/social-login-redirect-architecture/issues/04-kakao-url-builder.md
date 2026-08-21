# 04: Kakao URL builder 이식

**What to build:** 패키지 사용자가 기존 Kakao 입력으로 authorization URL을 만들 때, Kakao endpoint와 기본 response type을 유지하면서 공통 query serialization을 사용하도록 합니다.

**Blocked by:** 01: 공통 query serializer와 LINE URL builder 이식

**Status:** ready-for-human

- [x] Kakao authorization URL의 origin, pathname, 기본 response type이 기존 public contract와 동일하다.
- [x] 기존 Kakao public 입력이 provider query 이름으로 정상 직렬화된다.
- [x] redirect URI, state, scope 등 주요 query 값이 URL encoding을 거쳐 보존된다.
- [x] Kakao URL builder 테스트가 반환 URL의 origin, pathname, query를 검증한다.
- [x] 기존 Kakao login redirect와 public export가 변경되지 않는다.
- [x] 기존 package lint, build, Node test workflow가 통과한다.

## Comments

### 2026-08-21

- `social-login-redirect/src/kakao-login.ts`가 Kakao endpoint와 기본 `response_type`을 유지하면서 공통 `makeUrlWithQuery`를 사용하도록 변경했습니다.
- Kakao public 입력의 query 이름과 callback URI 내부 query·scope·state encoding, `undefined` optional input 생략, 빈 문자열 보존을 parsed URL 기준으로 검증했습니다.
- 기존 `kakaoLogin` redirect와 `index.ts` public export는 변경하지 않았습니다.
- `npm test`, `pnpm exec tsc --noEmit`, `node scripts/verify-packages.mjs`, `git diff --check`가 통과했습니다. 전체 package verification에서 7개 social-login-redirect 테스트가 통과했습니다.
- 커밋: `46d61ac` (`refactor(social-login-redirect): Kakao query serialization 공통화`)
- 브라우저 기반 live Kakao OAuth 인증과 실제 provider 수락 여부는 검증하지 않았습니다.
- 이번 구현 커밋에는 Kakao 구현·테스트 두 파일만 포함했으며, 기존 unrelated dirty worktree 변경은 보존했습니다.
