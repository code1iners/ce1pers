# @ce1pers/password-helpers

Password generation helpers using the Web Crypto API.

## Installation

##### npm

`npm i @ce1pers/password-helpers`

##### yarn

`yarn add @ce1pers/password-helpers`

## Usage

```javascript
// Import library.
import { usePassword } from "@ce1pers/password-helpers";

// Declare generation conditions when creating the helper.
const passwordLength = 20;
const useNumbers = true;
const useSymbols = true;
const useLowercase = false;
const useUppercase = true;

const { generate } = usePassword({
  passwordLength,
  useNumbers,
  useSymbols,
  useLowercase,
  useUppercase,
});

// Generate the password.
const { ok, data, error } = generate();

if (ok) {
  console.log(data); // Randomly password data.

  // Write you want process.
} else {
  console.warn(error); // Error code & message.

  // Write you want process.
}
```
