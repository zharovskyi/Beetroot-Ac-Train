class Person { 
    constructor(firstName) {
        this.firstName = firstName;
    }

    sayHi(){
        console.log(`Hi ${this.firstName}`);
    }

    static isPerson(ob) {
        return  ob instanceof Person;
    }
}


export default Person;