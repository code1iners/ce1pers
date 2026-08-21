# Social login redirect URL 생성 구조 개선

Status: ready-for-agent

## Problem Statement

패키지 사용자는 Google, Kakao, LINE, Naver, Apple, Facebook 중 하나를 선택해 provider의 authorization URL을 만들고 로그인 페이지로 이동할 수 있어야 합니다. 현재 각 provider module이 URLSearchParams 생성, 값 필터링, provider별 기본값, public 입력과 wire query 이름의 변환, endpoint 조립을 각각 직접 수행합니다.

이 구현이 provider마다 반복되면서 같은 외부 동작을 보장해야 하는 코드가 여러 곳으로 퍼져 있습니다. provider를 추가하거나 query 규칙을 수정할 때 한 provider만 다르게 동작할 위험이 있고, 현재 테스트도 LINE과 Naver에 집중되어 나머지 provider의 endpoint·기본값·query 직렬화 회귀를 충분히 알려주지 못합니다.

사용자는 기존 public function과 입력 형식을 그대로 사용하면서도, provider별 authorization URL이 이전과 같은 endpoint, query 이름, 기본값, 값 보존 규칙으로 생성되기를 기대합니다. 이 개선은 browser redirect나 callback 처리의 변경이 아니라 URL 생성 implementation의 중복과 shallow module 문제를 해결하는 작업입니다.

## Solution

기존 provider별 public interface를 유지하고, URL 생성 과정에서 반복되는 query serialization을 하나의 공통 module로 깊게 만듭니다.

각 provider adapter는 provider 고유의 책임을 계속 소유합니다.

- public 입력을 provider wire query 이름으로 mapping
- provider 기본값 결정
- 고정 endpoint 또는 version이 포함된 endpoint/path 조립

공통 module은 provider에 대한 지식 없이 최종 endpoint와 wire parameter를 받아 query를 직렬화합니다. undefined만 제외하고 그 외 값은 문자열로 변환해 false, 0, 빈 문자열을 보존합니다.

각 기존 *Login function은 생성된 URL을 사용해 window.location.href를 설정하는 역할을 유지합니다. callback, token exchange, callback 검증, session handling은 추가하지 않습니다.

## User Stories

1. As a package user, I want to keep calling the existing provider login URL functions, so that the architecture improvement does not require a migration.
2. As a package user, I want existing provider input names to remain valid, so that current application code continues to compile and run.
3. As a package user, I want each provider URL builder to return an authorization URL, so that I can inspect or use the URL before deciding how to navigate.
4. As a package user, I want each existing login function to redirect the browser as before, so that the public login flow is unchanged.
5. As a package user, I want Google authorization URLs to keep their current endpoint and default response type, so that Google login requests remain compatible with the provider.
6. As a package user, I want Kakao authorization URLs to keep their current endpoint and default response type, so that Kakao login requests remain compatible with the provider.
7. As a package user, I want LINE authorization URLs to keep their current version path and default response type, so that LINE login requests remain compatible with the selected LINE OAuth version.
8. As a package user, I want Facebook authorization URLs to keep their current version path and default response type, so that Facebook login requests remain compatible with the selected Facebook OAuth version.
9. As a package user, I want Naver's camelCase public inputs to remain mapped to Naver's wire query names, so that the provider receives client_id and redirect_uri rather than library-specific names.
10. As a package user, I want Apple authorization URLs to keep their current endpoint, response type, and scope defaults, so that Apple login requests preserve their current behavior.
11. As a package user, I want optional values set to undefined to be omitted, so that absent inputs do not become unintended query parameters.
12. As a package user, I want optional values set to false to be preserved as false, so that boolean provider options are not silently lost.
13. As a package user, I want numeric values such as 0 to be preserved as 0, so that valid zero-valued provider options remain effective.
14. As a package user, I want an empty string to remain an explicit query value, so that the serializer does not conflate an explicit empty value with an absent value.
15. As a package user, I want redirect URIs containing their own query parameters to be encoded as one query value, so that callback URLs arrive at the provider intact.
16. As a package maintainer, I want provider-specific mapping and defaults to remain near each provider adapter, so that provider rules are easy to locate and change.
17. As a package maintainer, I want query serialization to have one shared implementation, so that all providers follow the same omission and stringification rules.
18. As a package maintainer, I want endpoint and version-path construction to remain provider-owned, so that provider-specific URL semantics do not leak into a central configuration object.
19. As a package maintainer, I want the common module to work without browser globals, so that URL generation can be tested as a deterministic function.
20. As a package maintainer, I want the redirect side effect to remain outside the common module, so that the URL-generation seam stays independent from browser navigation.
21. As a package maintainer, I want tests to exercise all six public URL builders, so that a provider-specific regression is visible even when the common module is correct.
22. As a package maintainer, I want tests to assert parsed URL behavior rather than internal helper calls, so that the tests protect the public contract instead of freezing the implementation shape.
23. As a package maintainer, I want the package's existing lint, build, and node:test workflow to remain usable, so that the change fits the repository's independent-package verification model.
24. As a package maintainer, I want callback handling, token exchange, and session handling to remain absent from this package, so that this refactor does not expand its security or runtime responsibility.

## Implementation Decisions

- Preserve all existing exported provider functions and their current public input shapes. No generic public function is added and no existing public function is replaced.
- Keep URL generation and browser navigation as separate responsibilities. Each existing *Login function calls its provider URL builder and assigns the result to window.location.href.
- Introduce one internal common module for serializing provider wire parameters onto a provider-supplied endpoint.
- The common module omits only undefined values and stringifies every other value. This explicitly preserves false, 0, and empty strings.
- Each provider adapter owns its public-to-wire mapping and provider defaults. Naver's clientId/redirectUri mapping remains provider-local; other provider-specific input names remain provider-local as well.
- Each provider adapter owns endpoint construction. Fixed endpoints remain local to Apple, Google, Kakao, and Naver. Version-dependent endpoint paths remain local to LINE and Facebook.
- The common module does not own provider names, provider versions, callback processing, token exchange, authorization-code exchange, callback verification, or session state.
- Preserve the existing provider endpoint, version default, query names, default response type, Apple scope default, URL encoding behavior, and redirect behavior unless a current test or public documentation explicitly requires otherwise.
- Keep the package's existing export surface. The common serializer is an implementation detail and is not added to the package's public entrypoint unless implementation reveals a necessary public contract change that is separately approved.
- Do not modify unrelated packages or normalize their existing dirty worktree changes as part of this effort.

## Testing Decisions

- Test the highest existing seam: the public make*LoginUrl functions and their returned URLs. Tests should parse the returned URL and assert externally observable origin, pathname, and query parameters.
- Cover all six provider URL builders: Google, Kakao, LINE, Naver, Apple, and Facebook.
- For each provider, assert its endpoint or version path, required query names, and provider defaults that are part of the current public contract.
- Keep a focused Naver mapping test that proves clientId and redirectUri become client_id and redirect_uri and that the camelCase names are not emitted.
- Keep and extend the existing LINE value-preservation coverage for 0 and false, and add coverage that undefined is omitted while an empty string is preserved.
- Include a redirect URI containing its own query string to verify URLSearchParams encoding at the public URL-builder seam.
- Prefer assertions on parsed URL behavior over assertions about the existence, name, or call order of internal helpers. The internal common module is not a separate required test seam.
- Do not add browser or live-provider authentication tests. The redirect side effect remains an existing provider responsibility, and the package does not perform callback or token flows.
- Run the package's existing verification command, which builds after linting and then runs the Node test suite. Treat failures caused by the pre-existing dirty worktree or unrelated package changes separately from failures in this feature.
- The current prior art is the package's Node built-in test suite, which imports the built public distribution and validates parsed LINE and Naver authorization URLs.

## Out of Scope

- Changing any existing public function name, export, input field, or return behavior.
- Adding a generic public social-login function.
- Moving browser navigation into the common module or introducing a browser adapter solely for this refactor.
- Adding OAuth callback routes, callback verification, authorization-code exchange, token exchange, refresh-token handling, or session management.
- Validating credentials or making live requests to Google, Kakao, LINE, Naver, Apple, or Facebook.
- Updating provider versions or changing provider endpoint policy.
- Reworking unrelated helper packages, package metadata, lockfiles, or existing uncommitted changes outside the scoped package and its spec.
- Publishing a new npm version or changing deployment configuration.

## Further Notes

- The package README remains the public contract for the independent package. Any implementation change that alters documented behavior must update that contract in the same scoped change.
- The implementation should be evaluated by whether the common module has meaningful leverage across all six provider builders while provider-specific rules remain local and discoverable.
- A successful automated test run proves URL-builder behavior in Node. It does not prove live provider acceptance, browser navigation in every browser, or a complete OAuth exchange.
- The spec is ready for an agent implementation after preserving the user's existing dirty worktree and checking the final diff for scope.
