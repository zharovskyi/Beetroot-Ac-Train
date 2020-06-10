const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

const { curry } = R;

const fn = R.curry((el, evt, color) =>
  el.addEventListener(evt, (e) => (e.target.style.backgroundColor = color))
);
// usage
const b = fn(R.__, "click", R.__);
b(box1, "red");
b(box2, "green");
b(box3, "yellow");
