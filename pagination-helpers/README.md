# @ce1pers/pagination-helpers

Pagination helpers for JavaScript and TypeScript.

## Installation

##### npm

`npm i @ce1pers/pagination-helpers`

##### yarn

`yarn add @ce1pers/pagination-helpers`

## Usage

```javascript
// Import library.
import { paginator } from "@ce1pers/pagination-helpers";

// Initialize pagination.
const { getValues, next, previous } = paginator({
  array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  take: 3,
});

// Current values.
getValues(); // [ 1, 2, 3 ]

// Next page values.
next(); // [ 4, 5, 6 ]

// Previous page values.
previous(); // [ 1, 2, 3 ]
```
