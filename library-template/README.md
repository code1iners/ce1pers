# `library-template` (내부 템플릿)

TypeScript library 패키지를 시작할 때 복사해 사용하는 내부 템플릿입니다. 현재 npm registry에 발행되지 않으며 저장소의 공개 패키지 색인에도 포함하지 않습니다.

## 현재 공개 API

템플릿 자체의 예제 export는 `helloWorld()`입니다.

```ts
import { helloWorld } from "./index.js";

helloWorld();
```

새 라이브러리를 이 템플릿에서 시작하면 package name, version, README, entrypoint와 build·lint·test 계약을 새 패키지에 맞게 갱신해야 합니다. 현재 템플릿은 내부 전용이며 공개 package로 전환할 때 publish 계약을 별도로 결정해야 합니다.

## 검증

```bash
pnpm run lint
pnpm run build
```
