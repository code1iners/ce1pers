import { testMembers, testNumbers } from "../data/data";
import { generator } from ".";

const { generate } = generator({
  take: 4,
  data: testMembers,
});

const result = generate();
// console.log(result);
const nextResult = result.next();
// console.log(nextResult);
