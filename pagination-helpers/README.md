# @ce1pers/pagination-helpers

메모리 배열의 현재 페이지, 이동 상태, 페이지 목록을 관리하는 JavaScript·TypeScript helper입니다.

## 설치

```bash
npm install @ce1pers/pagination-helpers
```

## 공개 API

### `paginator({ array, take, offset? })`

입력 배열을 변경하지 않고 다음 메서드를 반환합니다.

| 반환 메서드 | 동작 |
| --- | --- |
| `getValues()` | 현재 페이지의 값 |
| `getCurrentPage()` | 현재 페이지 index |
| `next()`, `previous()` | 다음·이전 페이지로 이동하고 값 반환 |
| `hasNext()`, `hasPrevious()` | 이동 가능한 페이지 존재 여부 |
| `goTo(page)`, `goFirst()`, `goLast()` | 지정·첫·마지막 페이지로 이동 |
| `getPageList()` | 전체 페이지 index 목록 |
| `getDividedPageList(offset?)` | 페이지 목록을 offset 크기로 분할 |
| `getCurrentPageListRange()` | 현재 페이지가 속한 분할 목록 |

```ts
import { paginator } from "@ce1pers/pagination-helpers";

const pages = paginator({ array: [1, 2, 3, 4, 5], take: 2 });
pages.getValues(); // [1, 2]
pages.next(); // [3, 4]
pages.goLast(); // [5]
```

`take`은 페이지 크기이고 `offset` 기본값은 `10`입니다.

## 검증

```bash
npm run build
npm test
```
