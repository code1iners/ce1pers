# @ce1pers/window-helpers

브라우저 popup과 `postMessage` 통신을 제어하는 vanilla JavaScript helper입니다. React hook이 아닙니다.

## 설치

```bash
npm install @ce1pers/window-helpers
```

## 공개 API

### `useWindow(inputs?)`

`open`, message 송수신, source/target origin 상태, event listener 제어 메서드를 반환합니다.

| 반환 API | 동작 |
| --- | --- |
| `open(input)` | `windowTarget`에 따라 현재 창 또는 새 browsing context를 열고 창 참조 반환 |
| `sendMessage(input)` | `to: "targetOrigin" | "sourceOrigin"`에 따라 메시지 전송, 성공 여부 반환 |
| `sendMessageToTargetOrigin`, `sendMessageToSourceOrigin` | 지정한 방향으로 `{ type, data }` 전송 |
| `getWindow`, `getSourceOrigin`, `getTargetOrigin` | 현재 상태 조회 |
| `setSourceOrigin`, `setTargetOrigin` | 현재 origin 상태 설정 |
| `openDeepLink(url)` | 현재 창을 deep link로 이동 |
| `subscribe`, `unsubscribe` | message·unload listener 등록·해제 |

`open` 입력에는 `targetOrigin`이 필수이고 `windowTarget`, `width`, `height`, `left`, `top`, `options`, `isPopup`, `callback`을 선택적으로 전달합니다. `windowTarget` 기본값은 `_self`이므로 현재 창을 이동하며, 새 창이나 탭을 열려면 `_blank` 또는 재사용할 이름을 전달해야 합니다. `sendMessage`에는 `to`, `type`, `data`가 모두 필요합니다.

```ts
import { useWindow } from "@ce1pers/window-helpers";

function onMessageCallback(event: MessageEvent) {
  if (event.origin !== "https://child.example.com") return;
  // event.data를 애플리케이션 계약에 따라 검증합니다.
}

const popup = useWindow({ onMessageCallback });
popup.open({
  targetOrigin: "https://child.example.com",
  windowTarget: "_blank",
  isPopup: true,
  width: 400,
  height: 400,
});

popup.sendMessage({
  to: "targetOrigin",
  type: "connection",
  data: { source: "parent" },
});
```

`targetOrigin`은 scheme과 host를 포함한 실제 origin으로 설정하고, 수신 측에서 `event.origin`을 검증해야 합니다. 이 패키지는 메시지 payload의 schema 검증을 제공하지 않습니다.

## 공개 타입

`OpenWindowInputs`, `SendMessageInputs`, `SendMessageToOriginInputs`, `UsePopupInputs`를 export합니다.

## 검증

```bash
npm run build
npm test
```
