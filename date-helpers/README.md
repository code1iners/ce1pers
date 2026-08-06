# @ce1pers/date-helpers

날짜·시간 차이, 날짜 문자열 변환, 날짜 포맷, 월간 달력 데이터를 제공하는 helper입니다. 날짜 포맷에는 `moment`를 사용합니다.

## 설치

```bash
npm install @ce1pers/date-helpers
```

## 공개 API

| API | 반환·동작 |
| --- | --- |
| `getTimeDifference(date)` | 현재 시각과 `date`의 차이를 밀리초로 반환 |
| `getTimeDifferenceAsSeconds(date)` | 차이를 초 단위 정수로 반환 |
| `getTimeDifferenceAsMinutes(date)` | 차이를 분 단위 정수로 반환 |
| `getTimeDifferenceAsHours(date)` | 차이를 시간 단위 정수로 반환 |
| `getPassedTime(date)` | `{ unit: "hour" | "minute" | "second", time }` 또는 실패 시 `null` |
| `divideDateByEight(eight)` | `YYYYMMDD`를 `{ year, month, date }`로 나누거나 잘못된 길이면 `null` |
| `convertDateToEight(date, divider?)` | `Date`를 `YYYYMMDD` 또는 divider가 포함된 문자열로 변환 |
| `convertEightToDate(eight)` | 8자리 날짜 문자열을 `Date`로 변환하거나 실패 시 `null` |
| `withFormat(input?)` | 기본값은 오늘의 `YYYY-MM-DD`; `{ format, date? }`로 포맷 지정 |
| `getFirstDateOfMonth(month)` | 지정 월의 시작 `moment` 객체 |
| `getFirstDateOfCurrentMonth()` | 현재 월의 시작 `moment` 객체 |
| `getLastDateOfMonth(month)` | 지정 월의 끝 `moment` 객체 |
| `getLastDateOfCurrentMonth()` | 현재 월의 끝 `moment` 객체 |
| `makeCalendar(year, month)` | 이전·현재·다음 월을 포함한 `CalendarDateItem[]` |

```ts
import {
  convertDateToEight,
  convertEightToDate,
  getPassedTime,
  makeCalendar,
  withFormat,
} from "@ce1pers/date-helpers";

const date = new Date("2022-11-19T21:30:00");
const eight = convertDateToEight(date); // "20221119"
const restored = convertEightToDate(eight!);
const passed = getPassedTime(date);
const formatted = withFormat({ date, format: "YYYY/MM/DD" });
const calendar = makeCalendar(2022, 11);
```

## 공개 타입

- `GetPassedTimeOutputs`: `unit`과 `time`을 가진 경과 시간 결과
- `WithFormatInput`: `format`과 선택적 `date`

## 검증

```bash
npm run build
```
