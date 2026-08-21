# 06: Facebook versioned URL builder 이식

**What to build:** 패키지 사용자가 기존 Facebook 입력으로 authorization URL을 만들 때, 기본 또는 지정된 version path를 유지하면서 공통 query serialization을 사용하도록 합니다.

**Blocked by:** 01: 공통 query serializer와 LINE URL builder 이식

**Status:** ready-for-human

- [x] Facebook 기본 version path가 기존 public contract와 동일하다.
- [x] 사용자가 지정한 version이 provider endpoint path에 반영된다.
- [x] 기본 response type과 기존 public query 입력이 유지된다.
- [x] version이 query parameter로 잘못 추가되지 않고 endpoint path에만 반영된다.
- [x] Facebook URL builder 테스트가 반환 URL의 origin, pathname, query를 검증한다.
- [x] 기존 Facebook login redirect와 public export가 변경되지 않는다.

## Comments

### 2026-08-21

- `social-login-redirect/src/facebook-login.ts`가 기존 `v24.0` 기본 version과 지정 version path를 유지하면서 공통 `makeUrlWithQuery`를 사용하도록 변경했습니다.
- 회귀 테스트에서 Facebook 기본·지정 version의 origin/pathname, 기본·지정 `response_type`, 기존 query 값, `version` query 미노출을 parsed URL 기준으로 검증합니다.
- `scope: undefined`가 `scope=undefined`로 전달되지 않고 생략되는 공통 serializer 계약도 검증했습니다.
- `pnpm --dir social-login-redirect test` 12/12 통과, `pnpm --dir social-login-redirect exec tsc --noEmit`, `node scripts/verify-packages.mjs`, `git diff --check`가 통과했습니다. 저장소 전체 검증에서 `storage-helpers`의 기존 `MODULE_TYPELESS_PACKAGE_JSON` 경고가 출력되지만 검증은 통과했습니다.
- 기존 `facebookLogin` redirect와 `index.ts` public export는 변경하지 않았습니다.
- 브라우저 기반 live Facebook OAuth 인증과 실제 provider 수락 여부는 검증하지 않았습니다.

### 2026-08-21 검토 업데이트

- 커밋 `a216f3f`로 구현·테스트·티켓 기록을 반영했습니다.
- `4571b25...a216f3f` 기준 Standards 리뷰에서 재현 가능한 문제를 찾지 못했습니다.
- Spec 리뷰에서 새 구현의 누락·scope creep·잘못된 동작은 찾지 못했습니다. `makeFacebookLoginUrl`이 패키지 entrypoint에서 export되지 않는 기존 불일치는 확인했지만, 이 티켓의 기존 public export 유지 조건에 따라 변경하지 않았습니다.
