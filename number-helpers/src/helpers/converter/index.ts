/**
 * Convert decimal to hexadecimal.
 * @param {number} decimal Decimal value.
 * @returns Converted hexadecimal value.
 */
export const decimalToHex = (decimal: number) => decimal.toString(16);

/**
 * Convert decimal to octal.
 * @param {number} decimal Decimal value.
 * @returns Converted octal value.
 */
export const decimalToOctal = (decimal: number) => decimal.toString(8);

/**
 * Convert decimal to binary.
 * @param {number} decimal Decimal value.
 * @returns Converted binary value.
 */
export const decimalToBinary = (decimal: number) => decimal.toString(2);

/**
 * Convert hexadecimal to decimal.
 * @param {number} hex Hexadecimal value.
 * @returns Converted decimal value.
 */
export const hexToDecimal = (hex: string) => parseInt(hex, 16);

/**
 * Convert hexadecimal to octal.
 * @param {number} hex Hexadecimal value.
 * @returns Converted octal value.
 */
export const hexToOctal = (hex: string) => decimalToOctal(hexToDecimal(hex));

/**
 * Convert hexadecimal to binary.
 * @param {number} hex Hexadecimal value.
 * @returns Converted binary value.
 */
export const hexToBinary = (hex: string) => decimalToBinary(hexToDecimal(hex));

/**
 * Convert binary to decimal.
 * @param {number} hex Binary value.
 * @returns Converted decimal value.
 */
export const binaryToDecimal = (binary: string) => parseInt(binary, 2);

/**
 * Convert binary to decimal.
 * @param {number} hex Binary value.
 * @returns Converted octal value.
 */
export const binaryToOctal = (binary: string) =>
  decimalToOctal(binaryToDecimal(binary));

/**
 * Convert binary to hexadecimal.
 * @param {number} hex Binary value.
 * @returns Converted hexadecimal value.
 */
export const binaryToHex = (binary: string) =>
  decimalToHex(binaryToDecimal(binary));
