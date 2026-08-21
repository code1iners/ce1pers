# 02: Naver public-to-wire mapping 이식

**What to build:** 패키지 사용자가 기존 Naver 입력인 clientId와 redirectUri를 그대로 사용해 authorization URL을 만들고, Naver가 요구하는 client_id와 redirect_uri query 이름으로 전달되도록 합니다.

**Blocked by:** 01: 공통 query serializer와 LINE URL builder 이식

**Status:** ready-for-human

- [x] Naver authorization URL의 endpoint와 기본 response type이 기존 public contract와 동일하다.
- [x] clientId가 client_id로, redirectUri가 redirect_uri로 변환된다.
- [x] public 입력 이름인 clientId와 redirectUri가 wire query에 그대로 노출되지 않는다.
- [x] state와 callback URL encoding을 포함한 public URL builder 동작을 검증한다.
- [x] 기존 Naver login redirect와 public export가 변경되지 않는다.
- [x] 기존 package lint, build, Node test workflow가 통과한다.

## Comments

### 2026-08-21

- `social-login-redirect/src/naver-login.ts`가 공통 `makeUrlWithQuery`를 사용하도록 변경했습니다.
- Naver 고유 mapping인 `clientId` → `client_id`, `redirectUri` → `redirect_uri`를 adapter에 유지했습니다.
- 회귀 테스트에서 Naver endpoint/path, 기본 `response_type`, callback URI 내부 query와 state encoding, public camelCase query 미노출을 검증합니다.
- `npm test`와 `node scripts/verify-packages.mjs`가 통과했습니다. 전체 검증 중 storage-helpers의 기존 `MODULE_TYPELESS_PACKAGE_JSON` 경고만 출력되었습니다.
- 커밋: `de77eab` (`refactor(social-login-redirect): share Naver query serialization`)
- 브라우저 기반 live Naver OAuth 인증과 실제 provider 수락 여부는 검증하지 않았습니다.
