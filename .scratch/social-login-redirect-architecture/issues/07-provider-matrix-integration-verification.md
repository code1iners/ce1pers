# 07: 전체 provider matrix 통합 검증과 public contract 확인

**What to build:** 패키지 maintainer가 Google, Kakao, LINE, Naver, Apple, Facebook의 authorization URL 생성 동작을 한 번에 검증하고, 구조 개선이 public contract와 무관한 변경으로 제한되었음을 확인할 수 있도록 합니다.

**Blocked by:** 02: Naver public-to-wire mapping 이식; 03: Google URL builder 이식; 04: Kakao URL builder 이식; 05: Apple URL builder 이식; 06: Facebook versioned URL builder 이식

**Status:** ready-for-human

- [x] 6개 public URL builder의 origin, pathname, 기본값, query 이름을 parsed URL 기준으로 검증한다.
- [x] undefined 제외, false·0·빈 문자열 보존, redirect URI 내부 query encoding을 provider matrix에서 확인한다.
- [x] 기존 public export와 *Login redirect 동작에 불필요한 변경이 없다.
- [x] package README의 documented public behavior와 구현 결과가 일치한다.
- [x] package lint, build, Node test workflow가 최신 변경 상태에서 통과한다.
- [x] 검증 결과가 social-login 범위를 벗어난 기존 dirty worktree 변경과 섞이지 않았음을 확인한다.

## Comments

### 2026-08-21

- `social-login-redirect/src/social-login-redirect.test.js`의 반복된 provider 기본 URL 테스트를 `providerMatrix`로 통합했습니다.
- Google, Kakao, LINE, Naver, Apple, Facebook의 origin·pathname·기본 `response_type`·wire query 이름과 callback URI 내부 query encoding을 parsed URL 기준으로 확인합니다.
- matrix와 기존 provider별 테스트에서 `undefined` 생략, LINE의 `false`·`0`·빈 문자열 보존, Naver의 `clientId`/`redirectUri` mapping, Facebook·LINE version path를 확인합니다.
- package entrypoint export 목록을 README 공개 API와 함께 고정해 확인했으며, Apple/Facebook URL builder를 entrypoint에 새로 노출하지 않았습니다. 각 `*Login` 함수의 `window.location.href` redirect 책임과 구현 파일은 변경하지 않았습니다.
- 이번 구현 범위의 소스 변경은 scoped test 파일과 이 이슈 기록뿐이며, 기존 helper package metadata·lockfile·문서의 dirty worktree 변경은 staging 대상에서 제외했습니다.
- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test`(14/14), `node scripts/verify-packages.mjs`(전체 package verification 통과), `git diff --check`를 실행했습니다. 전체 게이트에서는 기존 `storage-helpers`의 `MODULE_TYPELESS_PACKAGE_JSON` warning이 출력됐지만 실패하지 않았습니다.
- 자동 검증은 Node의 URL builder 동작을 증명합니다. 실제 provider 인증 수락, 모든 브라우저의 navigation, callback·token exchange는 이 package 범위 밖이므로 검증하지 않았습니다.
- `HEAD` 대비 Standards/Spec 두 축 code review에서 재현 가능한 문제, 명세 누락, scope creep를 찾지 못했습니다.
