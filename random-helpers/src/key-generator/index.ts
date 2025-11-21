import type { MakeRandomKeyOptions } from './types';

/**
 * Generates a 5-digit random key.
 */
export const generateFiveDigitsRandomKey = () =>
  Math.random().toString(36).substring(2, 7);

/**
 * Generates a 10-digit random key.
 */
export const generateTenDigitsRandomKey = () =>
  `${generateFiveDigitsRandomKey()}${generateFiveDigitsRandomKey()}`;

/**
 * Make random key with length.
 */
export const makeRandomKeyWithLength = (length: number): string => {
  // Make default random key.
  let randomKey = generateTenDigitsRandomKey();

  try {
    if (length > randomKey.length) {
      const quotient = Math.ceil(length / 10);

      for (let i = 1; i < quotient; i++) {
        randomKey += generateTenDigitsRandomKey();
      }
    }
  } catch (err) {
    console.error(err);
  }

  randomKey = randomKey.substring(0, length);

  return randomKey;
};

/**
 * Make random key.
 *
 * @example
 * ```javascript
 * import { generate } from "@ce1pers/random-helpers";
 *
 * const key1 = generate();
 * console.log(key1); // Example: "k3j5h2b9q1"  (10 digits random key)
 * ```
 */
export const generate = (options?: MakeRandomKeyOptions) => {
  if (!options) return generateTenDigitsRandomKey();

  let randomKey;

  // Is there length option?
  if (options.length) {
    randomKey = makeRandomKeyWithLength(options.length);
  }

  return randomKey ?? generateTenDigitsRandomKey();
};
