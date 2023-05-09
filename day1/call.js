import { mySum } from "./index.js";

const myArr = [1, 2, 3, 4, 5];
const result = mySum(...myArr);

console.log(result);

const mySecondArr = myArr.map((num) => num * 2);
const average = mySum(...mySecondArr) / mySecondArr.length;
const mySecondNewArray = mySecondArr.filter((num) => num > average);
console.log(mySecondNewArray);

setTimeout(() => {
  console.log("Goodbye");
}, 3000);

const Employee = {
  name: "Yuki",
  email: "yuki@example.com",
  department: "Software Development",
  startDate: "2023-05-08",
};

const { name, email } = Employee;

const Person = {
  name,
  email,
};

console.log(Person);
