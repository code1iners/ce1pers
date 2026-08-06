# @ce1pers/password-helpers

Web Crypto API의 `crypto.getRandomValues`를 사용해 설정한 문자 집합에서 password를 생성합니다.

## 설치

```bash
npm install @ce1pers/password-helpers
```

## 공개 API

### `usePassword(options)`

```ts
declare function usePassword(options: {
  passwordLength?: number;
  useNumbers: boolean;
  useSymbols: boolean;
  useLowercase: boolean;
  useUppercase: boolean;
}): {
  generate():
    | { ok: true; data: string }
    | { ok: false; error: { code: string; message: string } };
};
```

`passwordLength` 기본값은 `20`입니다. 네 가지 문자 옵션 중 하나 이상을 `true`로 설정해야 하며, Web Crypto API가 없는 환경에서는 실패 결과를 반환합니다.

```ts
import { usePassword } from "@ce1pers/password-helpers";

const { generate } = usePassword({
  passwordLength: 20,
  useNumbers: true,
  useSymbols: true,
  useLowercase: true,
  useUppercase: true,
});

const result = generate();
if (result.ok) console.log(result.data);
else console.error(result.error.code, result.error.message);
```

주요 오류 코드는 잘못된 길이 `0001`, 문자 옵션 타입 오류 `0002`–`0005`, 문자 집합 미선택 `0006`, Web Crypto 미지원 `0007`입니다.

## 검증

```bash
npm run build
npm test
```
