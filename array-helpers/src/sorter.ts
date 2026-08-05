import { ObjectArraySorterInput } from "./types";

/**
 * Sorts an object array based on the provided 'sortBy' and 'sortByType'.
 *
 * @throws {Error} Throws an type error if the 'array' argument type is not array.
 * @throws {Error} Throws an type error if the 'sortByType' is not supported.
 */
export const objectArraySorter = <T = any>(
  input: ObjectArraySorterInput<T>
) => {
  try {
    const { array, sortBy, sortByType, reversed = false } = input;

    if (!Array.isArray(array))
      throw new TypeError(`'array' argument must be array type.`);

    // Cloning array.
    const cloned: any[] = JSON.parse(JSON.stringify(array));

    // Not passed key parameter?
    if (!sortBy) {
      cloned.sort();
    } else {
      // Has key?
      switch (sortByType) {
        case "string":
          cloned.sort((a: any, b: any) => {
            const aKey = a[sortBy].toUpperCase();
            const bKey = b[sortBy].toUpperCase();
            return aKey.localeCompare(bKey);
          });
          break;

        case "number":
          cloned.sort((a: any, b: any) => a[sortBy] - b[sortBy]);
          break;

        default:
          throw new TypeError(`Unsupported 'sortByType'.`);
      }
    }

    // Use reversed?
    if (reversed) cloned.reverse();

    return cloned;
  } catch (err) {
    console.warn((err as Error).message);
    return input.array;
  }
};

/** 버블 정렬 입력값. */
interface BubbleInput {
  /** 정렬할 숫자 배열. */
  array: number[];
  /** 이전 useSort 구현의 재귀 인자와의 타입 호환성을 위한 선택값. */
  index?: number;
  /** 정렬 방향. */
  order?: "ascending" | "descending";
}

/**
 * Sorts a number array without mutating the caller's input.
 */
export const bubble = ({
  array,
  // `index` was an internal recursion argument in useSort; keep accepting it
  // so existing callers compile while the iterative implementation ignores it.
  index: _index,
  order = "ascending",
}: BubbleInput): number[] => {
  /** 입력 배열의 변경을 막기 위한 복사본. */
  const result = [...array];

  // 인접한 값을 끝에서부터 확정해 빈 배열과 단일 배열도 종료시킨다.
  for (let end = result.length - 1; end > 0; end -= 1) {
    /** 현재 순회에서 교환이 발생했는지 여부. */
    let hasSwapped = false;

    for (let index = 0; index < end; index += 1) {
      /** 현재 비교값. */
      const currentValue = result[index];
      /** 다음 비교값. */
      const nextValue = result[index + 1];
      /** 현재 정렬 방향에서 값을 교환해야 하는지 여부. */
      const shouldSwap =
        order === "descending"
          ? currentValue < nextValue
          : currentValue > nextValue;

      if (!shouldSwap) continue;

      result[index] = nextValue;
      result[index + 1] = currentValue;
      hasSwapped = true;
    }

    // 이미 정렬된 배열은 남은 순회를 생략한다.
    if (!hasSwapped) break;
  }

  return result;
};
