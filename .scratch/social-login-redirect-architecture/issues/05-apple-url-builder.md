# 05: Apple URL builder 이식

**What to build:** 패키지 사용자가 기존 Apple 입력으로 authorization URL을 만들 때, Apple endpoint와 response type·scope 기본값을 유지하면서 공통 query serialization을 사용하도록 합니다.

**Blocked by:** 01: 공통 query serializer와 LINE URL builder 이식

**Status:** ready-for-human

- [x] Apple authorization URL의 origin과 pathname이 기존 public contract와 동일하다.
- [x] 기본 response type이 code로 유지된다.
- [x] 기본 scope가 name email로 유지된다.
- [x] client ID, redirect URI, nonce, state 등 주요 query 값이 반환 URL에 올바르게 반영된다.
- [x] Apple URL builder 테스트가 내부 구현이 아니라 반환 URL의 외부 동작을 검증한다.
- [x] 기존 Apple login redirect와 public export가 변경되지 않는다.

## Comments

### 2026-08-21

- `social-login-redirect/src/apple-login.ts`가 Apple endpoint와 기본 `response_type=code`, `scope=name email`을 유지하면서 공통 `makeUrlWithQuery`를 사용하도록 변경했습니다.
- Apple callback URI 내부 query, client ID, nonce, response mode, state를 parsed URL 기준으로 검증하고, `undefined` 생략과 빈 문자열 보존도 확인했습니다.
- 기존 `appleLogin` redirect와 `index.ts` public export는 변경하지 않았습니다.
- `npm test`가 lint·build·Node test를 포함해 9/9 통과했습니다.
- `pnpm exec tsc --noEmit`, `node scripts/verify-packages.mjs`, `git diff --check`가 통과했고, `HEAD^...HEAD` 기준 standards/spec code review에서도 발견사항이 없었습니다.
- 커밋: `e40cf24` (`refactor(social-login-redirect): Apple query serialization 공통화`)
- 브라우저 기반 live Apple OAuth 인증과 실제 provider 수락 여부는 검증하지 않았습니다.
- 기존 unrelated dirty worktree 변경은 보존했습니다.
