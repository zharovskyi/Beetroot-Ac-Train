import { Store } from "./Store";

export class ReduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.history = [];
  }
  reduce(state, action) {
    throw Error("reduce must be overriden in subclasses");
  }
  onDispatch(action) {
    const newState = this.reduce(this.state, action);

    if (newState !== this.state) {
      this.history.push(this.state);
      this.state = newState;
      this.emitChange();
    }
  }
  get hasHistory() {
    return this.history.length > 0;
  }
  revertLastHistory() {
    if (this.hasHistory) {
      this.state = this.history.pop();
      this.emitChange();
    }
  }
}
