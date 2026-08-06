# Ce1pers 문서 지도

이 저장소는 독립적으로 배포되는 npm 패키지 모음입니다. 각 패키지의 README가 해당 패키지의 현재 공개 API와 사용 계약을 관리하는 source of truth입니다.

## 문서 책임

| 문서 | 책임 |
| --- | --- |
| [저장소 README](../README.md) | 저장소 소개, 공개 패키지 색인, 공통 검증 진입점 |
| `<package>/README.md` | 패키지 목적, 설치, 공개 export, 입력·반환값, side effect, 오류, 예제 |
| [패키지 이전 가이드](./migrations/use-to-helpers.md) | 기존 `@ce1pers/use-*` 소비자의 새 패키지 이전 방법과 registry 상태 |
| [현재 미구현 과제](./unimplemented/current-unimplemented.md) | 아직 구현되지 않았거나 결정되지 않은 과제 한 곳 |
| `docs/decisions/*` | 현재 계약에 없는 장기 설계 결정의 배경과 결과. 필요할 때만 작성 |

이 저장소에는 서버 endpoint나 웹 route 구현이 없으므로 빈 `docs/server`·`docs/web` 문서는 만들지 않습니다.

## source of truth 규칙

- `index.ts`의 공개 export와 패키지 README의 API 표를 같은 변경에서 대조합니다.
- README는 복사해 사용할 수 있는 최소 예제와 실행 조건을 함께 적습니다.
- 구현되지 않은 아이디어와 완료된 작업 기록은 현재 API 설명에 섞지 않습니다.
- 구현 완료 후 계획 문서는 삭제하거나, 보존 가치가 있는 장기 결정만 `docs/decisions`로 추출합니다.
- 같은 사실을 여러 문서에 반복하지 않고, 상세 내용은 담당 문서로 링크합니다.
- npm publish/deprecate 같은 registry 변경은 문서 정리와 별도 작업으로 취급합니다.

## 변경 시 확인

1. 패키지 `package.json`의 이름·버전·실행 조건을 확인합니다.
2. 패키지 `index.ts`와 반환 객체의 소비자용 API를 확인합니다.
3. 해당 README의 입력·반환·side effect·오류·예제를 코드와 대조합니다.
4. 현재 미구현 문서에서 완료된 항목을 제거하고, 남은 과제만 유지합니다.
5. `git diff --check`, 관련 테스트·빌드, README 링크와 예제를 확인합니다.
