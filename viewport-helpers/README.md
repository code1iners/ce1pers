# @ce1pers/viewport-helpers

React helper for observing the browser viewport size.

## Installation

##### npm

`npm i @ce1pers/viewport-helpers`

##### yarn

`yarn add @ce1pers/viewport-helpers`

## Usage

### Use Screen
```javascript
// Import hook.
import { useScreen } from "@ce1pers/viewport-helpers";

// Call use screen hook.
const { windowSize } = useScreen();

// Print current window width & height.
console.log(windowSize?.width, windowSize?.height);
```
