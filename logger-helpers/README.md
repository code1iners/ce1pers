# @ce1pers/logger-helpers

`console` 메서드와 날짜·매개변수 표시를 조합해 debug 로그를 출력하는 helper입니다.

## 설치

```bash
npm install @ce1pers/logger-helpers
```

## 공개 API

### `dbugger(input)`

```ts
interface DebugInput {
  title: string;
  description?: string;
  parameters?: any;
  parametersStyle?: "string" | "object";
  debugLevel?: "debug" | "info" | "warning" | "error";
  includeDateTime?: boolean;
  flag?: string;
}

declare function dbugger(input: DebugInput): void;
```

`debugLevel`에 따라 `console.log`, `console.info`, `console.warn`, `console.error`를 선택합니다. 기본 level은 `debug`, 기본 `includeDateTime`은 `true`, 기본 `parametersStyle`은 `object`입니다. `DebugInput`과 `DebugLevel` 타입도 export합니다.

```ts
import { dbugger, type DebugInput } from "@ce1pers/logger-helpers";

const input: DebugInput = {
  title: "Logger helper",
  description: "debug message",
  debugLevel: "info",
  parameters: { name: "codeliner" },
};

dbugger(input);
```

## 검증

```bash
npm run build
```
