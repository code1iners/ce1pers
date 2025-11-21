# @ce1pers/random-helpers

Simple random helpers.

## Installation

##### npm

`npm i @ce1pers/random-helpers`

##### yarn

`yarn add @ce1pers/random-helpers`

## Usage

```javascript
// Import helper.
import { generate, pick, generateRandomNumber  } from "@ce1pers/random-helpers";

// Generate random string value.
const key = generate({ length: 15 });
console.log(key); // lj8xh4wb3bfyj7y (Example value).

// Picking one of them(1, 2, 3, 4, 5).
const [ok, picked] = pick([1, 2, 3, 4, 5]);

// Is success?
if (ok) {
  console.log(picked); // 2 (Selected value)
}

// Generate random number.
const randomNumber = generateRandomNumber({ slicing: 8 });
console.log(randomNumber); // Example: "48293017"

```
