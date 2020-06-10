// Сейчас в консоль выводится ReferenceError: name is not define
// Изменить код так, чтобы в консоль вывелась переменная name
// Done
function print() {
  function log() {
    name = "Beetroot";
  }
  log();
}
print();
console.log(name);

