# `use-*` 패키지에서 `*-helpers` 패키지로 이전

이 문서는 기존 `@ce1pers/use-*` 소비자가 현재 패키지 이름과 공개 API를 확인하는 소비자용 migration guide입니다. 새 패키지의 상세 API는 각 패키지 README가 source of truth입니다.

## 현재 상태

- 저장소 코드 이전: 완료
- 새 패키지 발행: 14개 패키지 모두 npm registry에 존재
- 기존 패키지 deprecation: 아래 8개 패키지에 적용됨
- npm registry 반영: `@ce1pers/social-login-redirect@1.1.1`, `@ce1pers/window-helpers@1.1.9` 포함 완료

## 이전 표

| 기존 패키지 | 현재 패키지 | 공개 API 확인 |
| --- | --- | --- |
| `@ce1pers/use-animation` | `@ce1pers/animation-helpers` | `makeRotateEffect` |
| `@ce1pers/use-array` | `@ce1pers/array-helpers` | 배열 삭제·정렬·병합·조합·순열 API |
| `@ce1pers/use-class` | `@ce1pers/style-helpers` | `clazz` |
| `@ce1pers/use-number` | `@ce1pers/number-helpers` | 진법 변환 API |
| `@ce1pers/use-page` | `@ce1pers/pagination-helpers` | `paginator` |
| `@ce1pers/use-password` | `@ce1pers/password-helpers` | `usePassword` |
| `@ce1pers/use-sort` | `@ce1pers/array-helpers` | `bubble` |
| `@ce1pers/use-window` | `@ce1pers/viewport-helpers` | `useScreen` |

## 이전 방법

1. 기존 import의 package name을 위 표의 현재 package name으로 바꿉니다.
2. 공개 함수와 입력 필드를 해당 패키지 README에서 확인합니다.
3. `use-window`의 `useWindow`와 `useScreen`을 혼동하지 않습니다. popup·postMessage API는 `window-helpers`, viewport React hook은 `viewport-helpers`입니다.
4. 기존 package는 deprecated 안내를 확인하고 새 package로 전환합니다.

## 관련 문서

- [문서 지도](../README.md)
- [array-helpers README](../../array-helpers/README.md)
- [style-helpers README](../../style-helpers/README.md)
- [viewport-helpers README](../../viewport-helpers/README.md)
- [window-helpers README](../../window-helpers/README.md)
