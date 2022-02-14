// Import library.
import { usePassword } from "../usePassword";

// Declared hook.
const { generate } = usePassword({
  useLowercase: false,
  useNumbers: false,
  useSymbols: false,
  useUppercase: true,
  passwordLength: 50,
});

// Generate.
const generated = generate();

// Check response.
console.log(generated);
