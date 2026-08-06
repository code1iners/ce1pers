# @ce1pers/style-helpers

조건부 class name 조합과 Tailwind class 충돌 병합을 제공하는 TypeScript helper입니다.

## 설치

```bash
npm install @ce1pers/style-helpers
```

## 공개 API

### `clazz(...classNames)`

문자열 class name을 공백 하나로 연결합니다.

```ts
declare function clazz(...classNames: string[]): string;
```

### `cn(...inputs)`

`clsx`로 조건부 class를 조합한 뒤 `tailwind-merge`로 충돌하는 Tailwind class를 병합합니다.

```ts
import type { ClassValue } from "clsx";

declare function cn(...inputs: ClassValue[]): string;
```

```ts
import { clazz, cn } from "@ce1pers/style-helpers";

clazz("button", "button-primary"); // "button button-primary"
cn("px-2 py-1", "px-4", false && "hidden"); // "py-1 px-4"
```

`@ce1pers/use-class`의 `clazz` API는 이 패키지에서 계속 제공합니다.

## 의존성

- `clsx`: 조건부 class 값 처리
- `tailwind-merge`: Tailwind class 충돌 해결

## 검증

```bash
npm run lint
npm run build
npm test
```
