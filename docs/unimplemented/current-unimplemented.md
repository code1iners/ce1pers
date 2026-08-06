# 현재 미구현 과제

이 문서는 현재 구현에 아직 반영되지 않았거나 결정이 필요한 항목만 관리합니다. 구현이 완료되면 해당 항목을 삭제하고 담당 README 또는 현재 계약 문서에 반영합니다.

## `social-login-redirect@1.1.0` registry 발행 대기

- 상태: 보류
- 대상 표면: `@ce1pers/social-login-redirect` package
- 현재 상태: 저장소 `package.json`은 `1.1.0`이며 LINE authorization URL 생성, 공개 `makeLineLoginUrl` export, query 직렬화 테스트가 구현됐습니다. npm latest는 `1.0.5`입니다. npm 인증은 `npm whoami`에서 성공했습니다.
- 필요성: LINE URL 수정이 실제 설치 소비자에게 전달되고 저장소 버전과 npm artifact가 일치해야 합니다.
- 구현 조건: 별도 발행 승인, tarball 소비자·브라우저 검증이 완료된 뒤 `1.1.0`을 public registry에 발행하고 exact/latest 설치를 재확인합니다.
- 관련 근거:
  - [social-login-redirect package.json](../../social-login-redirect/package.json)
  - [line-login.ts](../../social-login-redirect/src/line-login.ts)
  - [social-login-redirect README](../../social-login-redirect/README.md)

## `window-helpers@1.1.9` registry 발행 대기

- 상태: 보류
- 대상 표면: `@ce1pers/window-helpers` package
- 현재 상태: 저장소 `package.json`은 `1.1.9`, npm latest는 `1.1.8`입니다. 로컬 artifact는 CommonJS로 복구했고 package 형식을 명시했으며 popup·postMessage·listener 회귀 테스트가 통과했습니다.
- 필요성: ESM 경로 오류가 있는 미발행 산출물을 방지하고, 실제 설치 가능한 npm artifact와 저장소 버전을 일치시켜야 합니다.
- 구현 조건: 별도 발행 승인, `npm pack --dry-run --json`, CJS/ESM 소비자와 실제 브라우저 검증이 완료된 뒤 `1.1.9`를 public registry에 발행하고 exact/latest 설치를 재확인합니다.
- 관련 근거:
  - [window-helpers package.json](../../window-helpers/package.json)
  - [window-helpers tsconfig](../../window-helpers/tsconfig.json)
  - [window-helpers README](../../window-helpers/README.md)
