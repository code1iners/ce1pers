# social-login-redirect의 main 동기화 후 npm release

상태: accepted

Ce1pers는 독립 패키지를 관리하므로, `@ce1pers/social-login-redirect` release에서는 변경된 패키지만 대상으로 삼고 먼저 승인된 main 변경을 `origin/main`에 동기화한 뒤 원격 SHA를 확인하고 npm registry에 release한다. 이렇게 하면 registry artifact의 출처를 원격 main에서 추적할 수 있고, Git 동기화와 npm registry 변경이라는 서로 다른 외부 상태를 분리해 검증할 수 있다.

local main에서 먼저 npm release한 뒤 GitHub에 반영하거나 모든 패키지를 함께 release하는 방식은 패키지 경계와 provenance를 흐리므로 선택하지 않는다.
