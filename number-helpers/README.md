# @ce1pers/number-helpers

10진수·2진수·8진수·16진수 사이를 변환하는 helper입니다.

## 설치

```bash
npm install @ce1pers/number-helpers
```

## 공개 API

| 방향 | API |
| --- | --- |
| 10진수 → | `decimalToBinary`, `decimalToOctal`, `decimalToHex` |
| 2진수 → | `binaryToDecimal`, `binaryToOctal`, `binaryToHex` |
| 16진수 → | `hexToDecimal`, `hexToOctal`, `hexToBinary` |

10진수 입력은 `number`, 2진수·16진수 입력은 문자열이며 결과는 변환 방향에 따라 문자열 또는 숫자입니다. JavaScript의 `parseInt`와 `Number.prototype.toString` 규칙을 따릅니다.

```ts
import {
  binaryToDecimal,
  decimalToBinary,
  decimalToHex,
  hexToDecimal,
} from "@ce1pers/number-helpers";

decimalToHex(10); // "a"
decimalToBinary(10); // "1010"
binaryToDecimal("0010"); // 2
hexToDecimal("a"); // 10
```

## 검증

```bash
npm run build
npm test
```
