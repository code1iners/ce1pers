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

## 사용자 스토리

1. 패키지 사용자는 기존 provider 로그인 URL 함수를 계속 호출할 수 있어야 하며, 아키텍처 개선을 위해 마이그레이션할 필요가 없어야 합니다.
2. 패키지 사용자는 기존 provider 입력 이름을 계속 사용할 수 있어야 하며, 현재 애플리케이션 코드가 계속 컴파일되고 실행되어야 합니다.
3. 패키지 사용자는 각 provider URL builder가 authorization URL을 반환받아 이동하기 전에 URL을 확인하거나 직접 사용할 수 있어야 합니다.
4. 패키지 사용자는 기존 로그인 함수가 이전과 같이 브라우저를 redirect하여 public 로그인 흐름이 바뀌지 않기를 원합니다.
5. 패키지 사용자는 Google authorization URL의 기존 endpoint와 기본 response type이 유지되어 Google 로그인 요청이 provider와 계속 호환되기를 원합니다.
6. 패키지 사용자는 Kakao authorization URL의 기존 endpoint와 기본 response type이 유지되어 Kakao 로그인 요청이 provider와 계속 호환되기를 원합니다.
7. 패키지 사용자는 LINE authorization URL의 기존 version path와 기본 response type이 유지되어 선택한 LINE OAuth version과 계속 호환되기를 원합니다.
8. 패키지 사용자는 Facebook authorization URL의 기존 version path와 기본 response type이 유지되어 선택한 Facebook OAuth version과 계속 호환되기를 원합니다.
9. 패키지 사용자는 Naver의 camelCase public 입력이 기존처럼 wire query 이름으로 매핑되어 provider에 client_id와 redirect_uri가 전달되기를 원합니다.
10. 패키지 사용자는 Apple authorization URL의 기존 endpoint, response type, scope 기본값이 유지되어 Apple 로그인 요청의 동작이 보존되기를 원합니다.
11. 패키지 사용자는 undefined로 설정한 선택 값이 생략되어 의도하지 않은 query parameter가 만들어지지 않기를 원합니다.
12. 패키지 사용자는 false로 설정한 선택 값이 false로 보존되어 boolean provider 옵션이 조용히 사라지지 않기를 원합니다.
13. 패키지 사용자는 0과 같은 숫자 값이 0으로 보존되어 유효한 zero 값 provider 옵션이 적용되기를 원합니다.
14. 패키지 사용자는 빈 문자열이 명시적인 query 값으로 유지되어 serializer가 빈 값과 누락을 혼동하지 않기를 원합니다.
15. 패키지 사용자는 자체 query parameter를 포함한 redirect URI가 하나의 query 값으로 encoding되어 callback URL이 provider에 온전히 전달되기를 원합니다.
16. 패키지 maintainer는 provider별 mapping과 기본값이 각 provider adapter 가까이에 남아 있어 provider 규칙을 쉽게 찾고 변경할 수 있기를 원합니다.
17. 패키지 maintainer는 query serialization이 하나의 공통 구현을 사용해 모든 provider가 같은 생략·문자열 변환 규칙을 따르기를 원합니다.
18. 패키지 maintainer는 endpoint와 version path 조립이 provider 소유로 남아 provider별 URL 의미가 중앙 설정 객체로 새어나가지 않기를 원합니다.
19. 패키지 maintainer는 공통 module이 browser global 없이 동작해 URL 생성을 결정론적인 함수로 테스트할 수 있기를 원합니다.
20. 패키지 maintainer는 redirect side effect가 공통 module 밖에 남아 URL 생성 seam이 browser navigation과 독립적이기를 원합니다.
21. 패키지 maintainer는 6개 provider URL builder를 모두 테스트해 공통 module이 정상이어도 특정 provider 회귀를 확인할 수 있기를 원합니다.
22. 패키지 maintainer는 내부 helper 호출이 아니라 parsed URL 동작을 검증해 구현 형태가 아닌 public contract를 보호하기를 원합니다.
23. 패키지 maintainer는 기존 package lint, build, node:test workflow를 계속 사용할 수 있어야 하며, 변경이 독립 package 검증 모델에 맞기를 원합니다.
24. 패키지 maintainer는 callback handling, token exchange, session handling이 이 package에 추가되지 않아 보안·runtime 책임이 확장되지 않기를 원합니다.

## 구현 결정

- 기존에 export된 provider 함수와 public 입력 형태를 모두 유지합니다. generic public 함수는 추가하지 않고 기존 public 함수도 교체하지 않습니다.
- URL 생성과 browser navigation을 별도 책임으로 유지합니다. 각 기존 *Login 함수는 provider URL builder를 호출하고 결과를 window.location.href에 할당합니다.
- provider가 제공한 endpoint에 wire parameter를 직렬화하는 내부 공통 module 하나를 도입합니다.
- 공통 module은 undefined 값만 생략하고 나머지는 모두 문자열로 변환합니다. 따라서 false, 0, 빈 문자열을 명시적으로 보존합니다.
- 각 provider adapter는 public-to-wire mapping과 provider 기본값을 소유합니다. Naver의 clientId/redirectUri mapping은 provider 내부에 남기고 다른 provider별 입력 이름도 각 provider 내부에 둡니다.
- 각 provider adapter는 endpoint 조립을 소유합니다. 고정 endpoint는 Apple, Google, Kakao, Naver에 남기고 version에 따라 달라지는 endpoint path는 LINE과 Facebook에 남깁니다.
- 공통 module은 provider 이름, provider version, callback 처리, token exchange, authorization-code exchange, callback 검증, session state를 소유하지 않습니다.
- 현재 test 또는 public documentation이 별도로 요구하지 않는 한 기존 provider endpoint, version 기본값, query 이름, 기본 response type, Apple scope 기본값, URL encoding 동작, redirect 동작을 보존합니다.
- package의 기존 export surface를 유지합니다. 공통 serializer는 구현 세부사항이므로 별도 승인된 public contract 변경이 필요하지 않은 한 package public entrypoint에 추가하지 않습니다.
- 이 작업의 일부로 unrelated package를 수정하거나 기존 dirty worktree 변경을 정리하지 않습니다.

## 테스트 결정

- 가장 높은 기존 seam을 테스트합니다. export된 package-public make*LoginUrl 함수와 package entrypoint 밖에 남아 있는 provider의 기존 *Login redirect 함수를 사용합니다. 테스트는 반환되거나 capture한 URL을 parse하여 외부에서 관찰 가능한 origin, pathname, query parameter를 검증합니다.
- Google, Kakao, LINE, Naver, Apple, Facebook의 6개 provider URL builder 구현을 package-public builder 또는 기존 login redirect seam을 통해 검증합니다.
- 각 provider의 endpoint 또는 version path, 필수 query 이름, 현재 public contract의 provider 기본값을 검증합니다.
- clientId와 redirectUri가 client_id와 redirect_uri가 되고 camelCase 이름은 출력되지 않는다는 Naver mapping 전용 테스트를 유지합니다.
- 기존 LINE의 0·false 값 보존 테스트를 유지·확장하고, undefined는 생략되며 빈 문자열은 보존되는지 추가로 검증합니다.
- URL builder seam에서 URLSearchParams encoding을 검증할 수 있도록 자체 query string을 포함한 redirect URI를 사용합니다.
- 내부 helper의 존재·이름·호출 순서가 아니라 parsed URL 동작을 우선 검증합니다. 내부 공통 module은 별도 테스트 seam으로 만들 필요가 없습니다.
- browser 또는 live-provider authentication 테스트는 추가하지 않습니다. redirect side effect는 기존 provider 책임으로 남고 package는 callback이나 token flow를 수행하지 않습니다.
- lint 후 build하고 Node test suite를 실행하는 package의 기존 검증 명령을 실행합니다. pre-existing dirty worktree 또는 unrelated package 변경으로 발생한 실패는 이 기능의 실패와 분리해 판단합니다.
- 기존 선례에 따라 Node built-in test suite가 build된 public distribution과 provider-module builder를 import하여 parsed authorization URL을 검증합니다.

## 범위 제외

- 기존 public 함수 이름, export, 입력 필드, 반환 동작 변경
- generic public social-login 함수 추가
- 공통 module로 browser navigation 이동 또는 이 refactor만을 위한 browser adapter 도입
- OAuth callback route, callback 검증, authorization-code exchange, token exchange, refresh-token 처리, session management 추가
- Google, Kakao, LINE, Naver, Apple, Facebook credential 검증 또는 live request 수행
- provider version 업데이트 또는 provider endpoint 정책 변경
- 범위가 지정된 package와 명세 밖의 unrelated helper package, package metadata, lockfile, 기존 uncommitted 변경 정리
- 새 npm version publish 또는 deployment configuration 변경

## Further Notes

- package README는 독립 package의 public contract입니다. 문서화된 동작을 바꾸는 구현 변경은 같은 범위의 작업에서 해당 contract도 갱신해야 합니다.
- 구현은 공통 module이 6개 provider builder에 의미 있는 leverage를 제공하면서 provider별 규칙이 각 adapter에 가깝고 쉽게 찾을 수 있는지를 기준으로 평가합니다.
- 자동 test가 성공하면 Node 환경에서 URL builder 동작이 증명됩니다. 하지만 live provider 수락, 모든 browser의 navigation, 완전한 OAuth exchange까지 증명하지는 않습니다.
- 사용자의 기존 dirty worktree를 보존하고 최종 diff 범위를 확인한 뒤 이 명세를 agent 구현에 사용할 수 있습니다.
