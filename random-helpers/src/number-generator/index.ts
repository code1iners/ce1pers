export type GenerateRandomNumberInput = {
  /**
   * 생성할 숫자 문자열의 길이
   */
  slicing?: number;
};

/**
 * 주어진 길이만큼의 랜덤 숫자 문자열을 생성합니다.
 * @param slice 생성할 숫자 문자열의 길이 (기본값: 6)
 * @returns 랜덤 숫자 문자열
 *
 * @example
 * ```javascript
 * import { generateRandomNumber } from "@ce1pers/random-helpers";
 *
 * const randomNumber = generateRandomNumber({ slicing: 8 });
 * console.log(randomNumber); // 예: "48293017"
 * ```
 */
export const generateRandomNumber = (input?: GenerateRandomNumberInput) => {
  const { slicing = 6 } = input ?? {};

  // 0과 1 사이의 랜덤 숫자 생성.
  const randomNumber = Math.random();

  // 숫자를 문자열로 변환.
  const randomString = randomNumber.toString();

  // 문자열을 한 글자씩 쪼갬.
  const splitted = randomString.split('');

  // 0-9 정규식으로 숫자만 필터링.
  const onlyNumbers = splitted.filter(
    (char, i) => i !== 0 && /[0-9]/.test(char),
  );

  // 필터링된 숫자들을 다시 하나의 문자열로 합침.
  const joinedNumbers = onlyNumbers.join('');

  // 원하는 길이만큼 잘라냄.
  const slicedNumbers = joinedNumbers.slice(0, slicing);

  // 결과 반환.
  return slicedNumbers;
};
