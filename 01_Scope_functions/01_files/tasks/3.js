/*
1. Создать объект person с свойством name = "Bill"
2. Создать функцию setName(), которая
  - принимает в качестве  параметра объект ob
  - устанавливает у объекта ob свойство  name = "Paul"

3. Вывести в консоль значение свойства name объекта person
4. Вызвать функцию setName() и передать ей в качестве аргумента объект person
5. Вывести в консоль значение свойства name объекта person
*/
const person = {
  name: "Bill",
}
function setName(ob) {
  console.log(ob.name = "Paul");
}
console.log(person.name);
setName(person);
console.log(person.name);