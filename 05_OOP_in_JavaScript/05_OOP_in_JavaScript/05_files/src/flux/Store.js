export class Store {
  constructor(dispatcher) {
    this._listeners = []; // state => console.log(state)
    this.state = this.getInitialState();
    dispatcher.register(this.onDispatch.bind(this));
  }

  getInitialState() {
    throw Error("getInitialState must be overidden in subcasses");
  }
  onDispatch() {
    throw Error("onDispatch must be overidden in subcasses");
  }
  addListener(l) {
    this._listeners.push(l);
  }
  emitChange() {
    this._listeners.forEach((l) => l(this.state));
  }
  getState() {
    return this.state;
  }
}
