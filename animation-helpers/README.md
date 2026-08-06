# @ce1pers/animation-helpers

브라우저 DOM에 클릭 위치를 기준으로 회전하는 점 효과를 추가하는 helper입니다.

## 설치

```bash
npm install @ce1pers/animation-helpers
```

## 공개 API

### `makeRotateEffect(input)`

```ts
declare function makeRotateEffect(input: {
  x: number;
  y: number;
  dotColor?: string;
}): void;
```

`document.body`에 효과 DOM을 추가하고 약 200ms 뒤 제거합니다. 브라우저 DOM과 아래 CSS 클래스가 필요하며 React나 Vue 자체에는 의존하지 않습니다.

```ts
import { makeRotateEffect } from "@ce1pers/animation-helpers";

document.addEventListener("click", (event) => {
  makeRotateEffect({
    x: event.clientX,
    y: event.clientY,
    dotColor: "rgb(26, 188, 156)",
  });
});
```

효과에 필요한 CSS는 [content provider 예제](https://cdn.statically.io/gh/code1iners/ce1pers-content-provider-gulp/v0.0.0/dist/mouse-click-effects/index.min.css)를 애플리케이션에 포함해야 합니다.

## 검증

```bash
npm run build
npm test
```

## 관련 문서

- [저장소 문서 지도](../docs/README.md)
