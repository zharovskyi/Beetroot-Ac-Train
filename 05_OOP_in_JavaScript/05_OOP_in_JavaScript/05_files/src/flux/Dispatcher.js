export class Dispatcher {
    constructor(){
        this.listeners = []  // onDispatch
    }    
    register(listener) {
        this.listeners.push(listener)
    }
    dispath(action){
        this.listeners.forEach(l => l(action))
    }

}