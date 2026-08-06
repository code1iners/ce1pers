# @ce1pers/naming-convention-helpers

문자열을 camel, pascal, snake, kebab convention으로 변환하고 현재 convention을 판별하는 helper입니다.

## 설치

```bash
npm install @ce1pers/naming-convention-helpers
```

## 공개 API

| API | 반환·동작 |
| --- | --- |
| `extractNamingConvention(text)` | `normal`, `camel`, `pascal`, `snake`, `kebab` 중 하나 또는 `undefined` |
| `camelize(text, options?)` | camelCase 문자열. `options.delimiter`로 입력 구분자 지정 가능 |
| `pascalize(text)` | PascalCase 문자열 |
| `snakeize(text)` | snake_case 문자열 |
| `kebabize(text)` | kebab-case 문자열 |

```ts
import {
  camelize,
  extractNamingConvention,
  kebabize,
  pascalize,
  snakeize,
} from "@ce1pers/naming-convention-helpers";

const text = "naming convention test";
extractNamingConvention(text); // "normal"
camelize(text); // "namingConventionTest"
pascalize(text); // "NamingConventionTest"
snakeize(text); // "naming_convention_test"
kebabize(text); // "naming-convention-test"
```

## 공개 타입

`NamingConvention`을 export합니다.

## 검증

```bash
npm test
```
