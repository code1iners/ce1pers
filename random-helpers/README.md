# @ce1pers/random-helpers

보안 목적이 아닌 일반적인 random key, 숫자 문자열, 배열 항목 선택 helper입니다. `generate`, `generateRandomNumber`, `pick`은 `Math.random()`을 사용합니다.

## 설치

```bash
npm install @ce1pers/random-helpers
```

## 공개 API

| API | 입력 | 반환·동작 |
| --- | --- | --- |
| `generate(options?)` | `{ length?: number }` | 기본 10자리 영숫자 key 또는 지정 길이 key |
| `generateRandomNumber(input?)` | `{ slicing?: number }` | 기본 6자리 숫자 문자열 |
| `pick(items)` | `T[]` | `[ok, picked]`; 빈 배열 등 실패 시 `[false, undefined]` |

```ts
import {
  generate,
  generateRandomNumber,
  pick,
} from "@ce1pers/random-helpers";

const key = generate({ length: 15 });
const number = generateRandomNumber({ slicing: 8 });
const [ok, item] = pick(["a", "b", "c"]);
```

`MakeRandomKeyOptions`와 `GenerateRandomNumberInput` 타입도 export합니다.

## 검증

```bash
npm test
```
