export function helloWorld(greeting, name) {
  console.log(`${greeting} ${name}`);
}

// Arrow function
// - нельзя использовать как конструктор объектов
// - к ним нельзя применять оператор new
// - они не имеют this, и используюе его из  lexical scope
// то есть  this в arrow функции  имеет такое значение как и содержащая ее область

//export const greet = (greeting, name) => greeting + " " + name;

// Функция без параметров
/* 
const noParamsFunc = () => "function without params";
export { noParamsFunc };
*/

// Arrow function as iterators
/* 
const courses = ["HTML and CSS", "JavaScript", "JavaScript Advanced", "PHP"];
export function showCourses() {
  courses.map(course => console.log(course.toUpperCase()));
}
*/


const nums = [2, 120, 6, 12, 10, 78];
export function sortNums() {
  return nums.sort((a, b) => a - b);
}


// - this имеет такое значение как и содержащая ее область

/*
export default function Courses() {
  (this.name = "JavaScript advanced"),
    (this.publisher = "Beetroot Academy"),
    (this.summary = () => `Course ${this.name} published by ${this.publisher}`),
    (this.details = function() {
      const interval = setInterval(() => console.log(this.summary()), 1000);
      setTimeout(() => clearInterval(interval), 4000);
    });
}
*/

// Destruction

function getDate() {
  return [15, 7, 2016];
}

export function showDate() {
  const [day, month, year] = getDate();
  console.log(`${day}, ${month}, ${year}`);
}



// function currentDate() {
//   return { d: 15, m: 7, y: 2016 };
// }
// export function showCurrentDate() {
//   const { d: day, m: month, y: year } = currentDate();
//   console.log(`${day}, ${month}, ${year}`);
// }

