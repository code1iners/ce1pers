# Ce1pers 패키지 release context

Ce1pers는 각자의 공개 API와 버전을 관리하는 독립 npm helper package 모음입니다. 이 context는 저장소 변경과 npm registry release를 구분해 부르는 언어를 정의합니다.

## Language

### Package lifecycle

**독립 패키지**:
각자 버전과 공개 소비자 계약을 갖고 npm registry에 별도로 release되는 Ce1pers package입니다.
_Avoid_: root workspace package, monorepo package

**main 동기화**:
공개하려는 저장소 변경이 원격 `origin/main`에도 반영되어 local main과 같은 상태가 된 것입니다.
_Avoid_: npm publish, registry release

**npm release**:
특정 독립 패키지의 버전 하나를 npm registry에서 소비 가능하게 만드는 공개 release입니다.
_Avoid_: main push, GitHub 동기화

**패치 릴리스**:
기존 공개 입력과 호환되는 수정 또는 내부 구현 개선을 semver의 patch 숫자만 올려 release하는 것입니다.
_Avoid_: minor release, breaking release
