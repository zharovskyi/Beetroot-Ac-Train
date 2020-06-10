// Два способа создания регулярного выражения
// Методы regexp
// flags
// dot pattern  -> \n, flag s,  \.
// character set, meta symbols in set, negate set
// character class, pattern, negate class ranges
// str = "Єдина країна test"
// Cyrillic -> [a-яё],  [Ѐ-Ӿ],  [\u0400-\u04FF]
// quantity
// grouping pattern, alternation, pocket
// lazy quantity
// lookahead  ?=, ?! */
// word boundary \b, \B
const el = document.getElementById("regpre");
function out(st, re) {
  el.innerHTML = st.replace(re, (st) => `<span>${st}</span>`);
}

let st = `12/1/21 12-14-12 23/12/19 12-12-21`;

 let re = /^12.+21$/gi;
out(st, re);

console.log(st.replace(re, "$1"))
