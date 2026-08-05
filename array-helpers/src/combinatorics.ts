/**
 * Returns combinations whose item order does not create a new result.
 */
export const getCombinations = <T>(array: T[], size: number): T[][] => {
  if (size < 0 || size > array.length || !Number.isInteger(size)) return [];
  if (size === 0) return [[]];
  if (size === 1) return array.map((value) => [value]);

  /** 조합 결과를 누적하는 배열. */
  const results: T[][] = [];

  array.forEach((fixed, index, origin) => {
    // 현재 원소 뒤의 값만 사용해 순서가 다른 중복 조합을 막는다.
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, size - 1);

    combinations.forEach((combination) => {
      results.push([fixed, ...combination]);
    });
  });

  return results;
};

/**
 * Returns permutations without reusing an item from the input array.
 */
export const getPermutations = <T>(array: T[], size: number): T[][] => {
  if (size < 0 || size > array.length || !Number.isInteger(size)) return [];
  if (size === 0) return [[]];
  if (size === 1) return array.map((value) => [value]);

  /** 순열 결과를 누적하는 배열. */
  const results: T[][] = [];

  array.forEach((fixed, index, origin) => {
    // 현재 기준값만 제외한 나머지 배열로 다음 순서를 만든다.
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, size - 1);

    permutations.forEach((permutation) => {
      results.push([fixed, ...permutation]);
    });
  });

  return results;
};

/**
 * Returns permutations that may reuse every input item.
 */
export const getPermutationsWithSelf = <T>(array: T[], size: number): T[][] => {
  if (size < 0 || !Number.isInteger(size)) return [];
  if (size === 0) return [[]];

  /** 중복을 허용한 순열 결과를 누적하는 배열. */
  const results: T[][] = [];

  array.forEach((fixed) => {
    // 기준값을 제거하지 않고 재귀 호출해 동일 원소 반복을 허용한다.
    const permutations = getPermutationsWithSelf(array, size - 1);

    permutations.forEach((permutation) => {
      results.push([fixed, ...permutation]);
    });
  });

  return results;
};
