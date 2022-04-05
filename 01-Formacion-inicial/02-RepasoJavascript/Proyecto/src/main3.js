class User {
    constructor(name,age) {
        return [{"nombre": this.name, "edad": this.age}];
    }
}

class userDB {

    usersDB = [];
    constructor(name,age) {
        this.name = name;
        this.age = age;       
    }

    addUser(name,age) {
        usersDB.push(name,age);
    }

    removeUser(name) {
        let indexedDB = this.usersDB.findIndex(); 
    }
}

