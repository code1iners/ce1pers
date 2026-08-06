# @ce1pers/array-helpers

배열 삭제, 정렬, 병합, 중복 제거, 조합·순열 생성을 제공하는 TypeScript helper입니다.

## 설치

```bash
npm install @ce1pers/array-helpers
```

## 공개 API

| API | 입력 | 반환·동작 |
| --- | --- | --- |
| `deleteById` | `array`, `{ key, value, once? }` | 지정한 key/value를 가진 항목을 제거한 새 배열 |
| `deleteByIndex` | `array`, `index` | 지정 index를 제거한 새 배열 |
| `deleteItem` | `array`, `{ by: "id" | "index", ... }` | `by` 값에 따라 위 삭제 함수 실행 |
| `distincter` | `array` | 중복 값을 제거한 배열 |
| `objectArrayMerger` | `{ arrays, mergeBy }` | 같은 index의 객체 값을 합친 배열. 길이·key 오류 시 빈 배열 |
| `objectArraySorter` | `{ array, sortBy, sortByType, reversed? }` | 원본을 복사해 문자열·숫자 기준으로 정렬 |
| `bubble` | `{ array, order?: "ascending" | "descending" }` | 숫자 배열을 복사해 버블 정렬 |
| `getCombinations` | `array`, `size` | 순서를 구분하지 않는 조합 목록 |
| `getPermutations` | `array`, `size` | 입력 항목을 재사용하지 않는 순열 목록 |
| `getPermutationsWithSelf` | `array`, `size` | 항목 재사용을 허용한 순열 목록 |

`size`가 정수가 아니거나 범위를 벗어나면 조합·순열 함수는 빈 배열을 반환합니다. 정렬 함수는 지원하지 않는 `sortByType`을 경고하고 입력 배열을 반환할 수 있습니다.

```ts
import {
  bubble,
  deleteItem,
  getCombinations,
  objectArraySorter,
} from "@ce1pers/array-helpers";

const sorted = bubble({ array: [3, 1, 2], order: "ascending" });
const combinations = getCombinations([1, 2, 3], 2);
const users = objectArraySorter({
  array: [{ id: 2 }, { id: 1 }],
  sortBy: "id",
  sortByType: "number",
});
const withoutFirst = deleteItem([{ id: 1 }, { id: 2 }], {
  by: "index",
  index: 0,
});
```

## 이전 API

`@ce1pers/use-array`와 `@ce1pers/use-sort`의 API는 이 패키지로 통합되었습니다. [이전 가이드](../docs/migrations/use-to-helpers.md)를 참고하세요.

## 공개 타입

`DeleteItemByIdExtraOptionsType`, `DeleteItemOptions`, `ObjectArrayMergerInput`, `ObjectArraySorterInput`을 export합니다.

## 검증

```bash
npm run build
npm test
```
