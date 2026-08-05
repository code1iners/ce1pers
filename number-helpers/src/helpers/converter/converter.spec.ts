import {
  decimalToHex,
  decimalToBinary,
  decimalToOctal,
  binaryToDecimal,
  binaryToHex,
  binaryToOctal,
  hexToBinary,
  hexToDecimal,
  hexToOctal,
} from "./index";

console.log(decimalToHex(10)); // 'a'
console.log(decimalToBinary(10)); // '1010'
console.log(decimalToOctal(10)); // '12'

console.log(binaryToDecimal("0010")); // 2
console.log(binaryToHex("1010")); // 'a'
console.log(binaryToOctal("1000")); // '10'

console.log(hexToBinary("a")); // '1010'
console.log(hexToDecimal("a")); // 10
console.log(hexToOctal("a")); // '12'
