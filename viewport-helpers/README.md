# @ce1pers/viewport-helpers

React에서 브라우저 viewport 크기를 구독하는 hook입니다.

## 설치

```bash
npm install @ce1pers/viewport-helpers react
```

React `18` 이상을 peer dependency로 요구합니다.

## 공개 API

### `useScreen()`

```ts
declare function useScreen(): {
  windowSize: { width: number; height: number } | undefined;
  subscribe(): void;
  unsubscribe(): void;
};
```

mount 시 현재 `window.innerWidth`·`window.innerHeight`를 읽고 `resize` listener를 등록합니다. unmount 시 listener를 제거하며, SSR에서는 `windowSize`가 처음에 `undefined`일 수 있습니다.

```tsx
import { useScreen } from "@ce1pers/viewport-helpers";

function ViewportLabel() {
  const { windowSize } = useScreen();
  return <span>{windowSize?.width} × {windowSize?.height}</span>;
}
```

## 검증

```bash
npm run build
npm test
```
