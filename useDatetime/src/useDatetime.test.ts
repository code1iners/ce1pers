// Import Library.
import { useDatetime } from "./useDatetime";

// Declared hook.
const { getPassedTime, convertDateToEight, convertEightToDate } = useDatetime();

// Set datetime.
const date = new Date("2022-02-14T22:40:00");

// Get passed time.
const passedTime = getPassedTime(date);
console.log(passedTime);

// Convert to eight digit time.
const eight = convertDateToEight(date);
console.log(eight);

// Convert to date.
const convertedDate = convertEightToDate(eight);
console.log(convertedDate);
