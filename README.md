# Ce1pers

독립적으로 배포되는 JavaScript·TypeScript helper 패키지 모음입니다. 각 패키지의 설치법과 공개 API는 해당 패키지 README가 기준입니다.

## 문서

- [문서 지도와 source of truth 규칙](./docs/README.md)
- [`use-*`에서 `*-helpers`로 이전](./docs/migrations/use-to-helpers.md)
- [현재 미구현 과제](./docs/unimplemented/current-unimplemented.md)

## 공개 패키지

| 패키지 | 목적 | 저장소 버전 | npm latest | 문서 | npm |
| --- | --- | ---: | ---: | --- | --- |
| `@ce1pers/animation-helpers` | DOM animation effect | 1.0.3 | 1.0.3 | [README](./animation-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/animation-helpers) |
| `@ce1pers/array-helpers` | 배열 삭제·정렬·병합·조합·순열 | 1.3.0 | 1.3.0 | [README](./array-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/array-helpers) |
| `@ce1pers/date-helpers` | 날짜·시간 변환과 달력 데이터 | 1.2.0 | 1.2.0 | [README](./date-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/date-helpers) |
| `@ce1pers/logger-helpers` | console debug 출력 | 1.0.3 | 1.0.3 | [README](./logger-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/logger-helpers) |
| `@ce1pers/naming-convention-helpers` | 문자열 naming convention 변환 | 1.0.0 | 1.0.0 | [README](./naming-convention-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/naming-convention-helpers) |
| `@ce1pers/number-helpers` | 진법 변환 | 1.0.0 | 1.0.0 | [README](./number-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/number-helpers) |
| `@ce1pers/pagination-helpers` | 메모리 배열 pagination 상태 | 1.8.0 | 1.8.0 | [README](./pagination-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/pagination-helpers) |
| `@ce1pers/password-helpers` | Web Crypto 기반 password 생성 | 1.1.4 | 1.1.4 | [README](./password-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/password-helpers) |
| `@ce1pers/random-helpers` | random key·number·item 생성 | 1.2.0 | 1.2.0 | [README](./random-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/random-helpers) |
| `@ce1pers/social-login-redirect` | social login authorization URL·redirect | 1.0.5 | 1.0.5 | [README](./social-login-redirect/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/social-login-redirect) |
| `@ce1pers/storage-helpers` | IndexedDB helper | 1.0.14 | 1.0.14 | [README](./storage-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/storage-helpers) |
| `@ce1pers/style-helpers` | class name 조합·Tailwind 병합 | 1.0.2 | 1.0.2 | [README](./style-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/style-helpers) |
| `@ce1pers/viewport-helpers` | React viewport size hook | 1.4.2 | 1.4.2 | [README](./viewport-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/viewport-helpers) |
| `@ce1pers/window-helpers` | popup·window messaging API | 1.1.9 | 1.1.8 | [README](./window-helpers/README.md) | [npm](https://www.npmjs.com/package/@ce1pers/window-helpers) |

`저장소 버전`은 각 `package.json`, `npm latest`는 2026-08-06 registry 조회 기준입니다. local/npm 차이는 [현재 미구현 과제](./docs/unimplemented/current-unimplemented.md)에서 관리합니다.

## 내부 템플릿

`library-template`은 현재 npm에 발행되지 않고 공개 패키지 색인에 포함하지 않는 내부 TypeScript library template입니다. 공개 패키지로 전환하려면 별도 공개 범위 결정과 registry 절차가 필요합니다.

## 공통 검증

각 패키지 디렉터리에서 지원하는 검증 명령은 패키지 README에 적습니다. 전체 문서 변경 후에는 다음을 실행합니다.

```bash
git diff --check
rg -n "TODO|FIXME" README.md docs */README.md
```
