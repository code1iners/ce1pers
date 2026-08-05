# @ce1pers/array-helpers

Included simple array helpers.

## Installation

##### npm

`npm i @ce1pers/array-helpers`

## Usage

### Sorter example.
```javascript
import { objectArraySorter } from "@ce1pers/array-helpers";

const sorterResult = objectArraySorter({
  array: [
    { id: 1, name: "user1" },
    { id: 3, name: "user3" },
    { id: 2, name: "user2" },
  ],
  sortBy: "id",
  sortByType: "number",
});
console.log(sorterResult); // [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }, { id: 3, name: 'user3' }]
```

### Numeric sort and combinatorics examples.

```javascript
import {
  bubble,
  getCombinations,
  getPermutations,
  getPermutationsWithSelf,
} from "@ce1pers/array-helpers";

const sorted = bubble({ array: [3, 1, 2], order: "ascending" });
const combinations = getCombinations([1, 2, 3], 2);
const permutations = getPermutations([1, 2, 3], 2);
const repeatedPermutations = getPermutationsWithSelf([1, 2], 2);
```

`@ce1pers/use-array`와 `@ce1pers/use-sort`의 API는 이 패키지로 이동했습니다.

### Merger example.

```javascript
import { objectArrayMerger, distincter } from "@ce1pers/array-helpers";

const mergerResult = objectArrayMerger({
  arrays: [
    [{ id: 1, name: "user1" }],
    [{ id: 2, name: "user2" }],
    [{ id: 3, name: "user3" }],
  ],
  mergeBy: "name",
});
console.log(mergerResult); // [['user1', 'user2', 'user3']]

// Distincter example.
const distincterResult = distincter([1, 1, 2, 3, 4, "5", "5"]);
console.log(distincterResult); // [1, 2, 3, 4, '5']
```

### Deleter example.

```javascript
import { deleteItem } from "@ce1pers/array-helpers";

const array = [
  { id: 0, name: "Emilie" },
  { id: 1, name: "Benjamin" },
  { id: 2, name: "Gary" },
  { id: 3, name: "Herman" },
  { id: 4, name: "Emilie" },
] as const;

const result1 = deleteItem(array, {
  by: "id",
  key: "name",
  value: "Emilie",
});
console.log(result1); // [ { id: 1, name: 'Benjamin' }, { id: 2, name: 'Gary' }, { id: 3, name: 'Herman' } ]

const result2 = deleteItem(array, {
  by: "id",
  key: "name",
  value: "Emilie",
  once: true,
});
console.log(result2); // [ { id: 1, name: 'Benjamin' }, { id: 2, name: 'Gary' }, { id: 3, name: 'Herman' }, { id: 4, name: 'Emilie' } ]

const result3 = deleteItem(array, {
  by: "index",
  index: 4,
});
console.log(result3); // [ { id: 0, name: 'Emilie' }, { id: 1, name: 'Benjamin' }, { id: 2, name: 'Gary' }, { id: 3, name: 'Herman' } ]
```
