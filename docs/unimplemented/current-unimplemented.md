# 현재 미구현 과제

## TypeScript 7 전환

- 상태: 보류
- 대상 표면: 15개 독립 패키지의 TypeScript build·lint toolchain
- 현재 상태: TypeScript 6.0.3과 `typescript-eslint` 8.66.0을 사용합니다.
- 필요성: TypeScript 7의 native compiler와 이후 compiler 지원을 도입하려면 현재 toolchain과 제거된 compiler option을 함께 전환해야 합니다.
- 구현 조건: `typescript-eslint`이 TypeScript 7을 공식 지원하고, Node 22·24 및 공개 tarball 소비자 회귀 검증을 통과해야 합니다.
- 관련 근거:
  - 각 패키지의 `package.json`과 `tsconfig.json`
  - 저장소 루트 `README.md`의 공통 검증 절차
