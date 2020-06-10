const { EventEmitter } = require("events");
const db = new EventEmitter();

function Request() {
  this.bidData = new Array(1e9).join("+");

  this.handle = function () {
    this.send("Hello");
  };

  db.on("data", this.handle);

  this.end = function () {
    db.removeListener("data", this.handle);
  };

  this.send = function (msg) {
    console.log(msg);
  };
}

setInterval(() => {
  const r = new Request();
  const currentAmount = process.memoryUsage().heapUsed;
  console.log(currentAmount);
  r.end();
  console.log(db);
}, 100);
