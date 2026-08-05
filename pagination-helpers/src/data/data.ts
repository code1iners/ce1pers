interface IMember {
  name: string;
  age: number;
}

export const testNumbers: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100, 101,
];

export const testMembers: IMember[] = [
  {
    name: "member1",
    age: 20,
  },
  {
    name: "member2",
    age: 21,
  },
  {
    name: "member3",
    age: 24,
  },
  {
    name: "member4",
    age: 22,
  },
  {
    name: "member5",
    age: 31,
  },
  {
    name: "member6",
    age: 29,
  },
  {
    name: "member7",
    age: 24,
  },
  {
    name: "member8",
    age: 22,
  },
  {
    name: "member9",
    age: 33,
  },
  {
    name: "member10",
    age: 35,
  },
  {
    name: "member11",
    age: 19,
  },
  {
    name: "member12",
    age: 22,
  },
  {
    name: "member13",
    age: 29,
  },
  {
    name: "member14",
    age: 29,
  },
  {
    name: "member15",
    age: 37,
  },
  {
    name: "member16",
    age: 18,
  },
  {
    name: "member17",
    age: 20,
  },
  {
    name: "member18",
    age: 22,
  },
  {
    name: "member19",
    age: 23,
  },
  {
    name: "member20",
    age: 32,
  },
  {
    name: "member21",
    age: 36,
  },
  {
    name: "member22",
    age: 31,
  },
  {
    name: "member23",
    age: 25,
  },
  {
    name: "member24",
    age: 27,
  },
  {
    name: "member25",
    age: 28,
  },
  {
    name: "member26",
    age: 32,
  },
  {
    name: "member27",
    age: 30,
  },
  {
    name: "member28",
    age: 29,
  },
  {
    name: "member29",
    age: 19,
  },
  {
    name: "member30",
    age: 30,
  },
];

export const testData = {
  numbers: testNumbers,
  members: testMembers,
};

export const users = [...Array(17).keys()].map((i) => ({
  name: `user-${i}`,
  age: `${i}`,
}));
