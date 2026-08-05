# 패키지 이름 및 공개 API 이전

이 문서는 `ce1pers` 패키지의 현재 공개 API와 `*-helpers` 이름 이전 계약을 관리합니다.

## 이전 기준일

- 기준일: 2026-08-05
- 기존 공개 API snapshot: 구현 전 상태를 기준으로 저장소 조사에서 확인
- `window-helpers`는 이 이전의 대상이 아닙니다.

## 최종 패키지 매핑

| 이전 프로젝트 | 최종 프로젝트 | 공개 API 처리 |
| --- | --- | --- |
| `useAnimation` | `animation-helpers` | `makeRotateEffect` 유지 |
| `useArray` | `array-helpers` | 조합·순열 함수 export 추가 후 프로젝트 제거 |
| `useClass` | `style-helpers` | `clazz` 유지 후 프로젝트 제거 |
| `useNumber` | `number-helpers` | 숫자 변환 함수 유지 |
| `usePage` | `pagination-helpers` | `paginator` 유지 |
| `usePassword` | `password-helpers` | `usePassword` 유지, Web Crypto 사용 |
| `useSort` | `array-helpers` | `bubble` export 추가 후 프로젝트 제거 |
| `useWindow` | `viewport-helpers` | `useScreen` 유지, 샘플 `useWindow` 제거 |
| `window-helpers` | `window-helpers` | 팝업·메시징 API 유지 |

## 기존 API

### `@ce1pers/use-animation`

```ts
export { makeRotateEffect } from "./src/helpers/mouse_click_effects/rotate_effect";
```

### `@ce1pers/use-array`

```ts
export {
  getCombinations,
  getPermutations,
  getPermutationsWithSelf,
} from "@/helpers";
```

### `@ce1pers/use-class`

```ts
export { clazz } from "./src/class-helpers";
```

### `@ce1pers/use-number`

```ts
export {
  binaryToDecimal,
  binaryToHex,
  binaryToOctal,
  decimalToBinary,
  decimalToHex,
  decimalToOctal,
  hexToBinary,
  hexToDecimal,
  hexToOctal,
} from "./src/helpers/converter";
```

### `@ce1pers/use-page`

```ts
export { paginator } from "./src/helpers";
```

### `@ce1pers/use-password`

```ts
export { usePassword } from "./src/usePassword";
```

### `@ce1pers/use-sort`

```ts
export { bubble } from "./src/helpers/sorter";
```

### `@ce1pers/use-window`

```ts
export { useWindow } from "./src/useWindow";
export { useScreen } from "./src/useScreen";
```

## npm 전환 정책

신규 패키지를 공개 npm에 발행하고 레지스트리에서 실제 설치를 확인한 뒤, 기존 `@ce1pers/use-*` 패키지를 즉시 deprecated 처리합니다. 기존 패키지의 버전과 tarball은 삭제하지 않습니다.

| deprecated 패키지 | 안내할 새 패키지 |
| --- | --- |
| `@ce1pers/use-animation` | `@ce1pers/animation-helpers` |
| `@ce1pers/use-array` | `@ce1pers/array-helpers` |
| `@ce1pers/use-class` | `@ce1pers/style-helpers` |
| `@ce1pers/use-number` | `@ce1pers/number-helpers` |
| `@ce1pers/use-page` | `@ce1pers/pagination-helpers` |
| `@ce1pers/use-password` | `@ce1pers/password-helpers` |
| `@ce1pers/use-sort` | `@ce1pers/array-helpers` |
| `@ce1pers/use-window` | `@ce1pers/viewport-helpers` |

발행·deprecation 중 하나라도 실패하면 나머지 레지스트리 변경을 중단합니다.
