/**
 * Pick one of them.
 *
 * @example
 * ```javascript
 * import { pick } from "@ce1pers/random-helpers";
 *
 * const items = [1, 2, 3, 4, 5];
 * const [ok, picked] = pick(items);
 * console.log(ok, picked); // Example: true 2
 * ```
 */
export const pick = <T>(items: T[]): [boolean, T | undefined] => {
  try {
    const tagged = Array.from([...items]).map((item, index) => ({
      [index]: item,
    }));

    // Make random number with limit.
    const randomNumber = Math.random();
    const pickedNumber = Math.floor(randomNumber * items.length);
    const pickedObject = tagged[pickedNumber];
    const [picked] = Object.values(pickedObject);

    return [true, picked];
  } catch (err) {
    return [false, undefined];
  }
};
