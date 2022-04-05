export class User{

    readonly id : number;
    name : string;
    age : number;

    constructor(id : number, name : string, age : number){
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

export class UserDB{

    constructor(protected userDB : User[] = []){
        this.userDB = userDB;
    }

    addUser(user : User) : void{
        if(!this.checkUser(user))
            console.log('El usuario ya existe.');
        else
            this.userDB.push(user);
    }

    modifyUser(user : User) : void{
        const [index, userfound] = this.findUser(user.id);
        if (!!userfound){
            this.userDB[index].name = user.name;
            this.userDB[index].age = user.age;
        }
    }

    printUsers() : void{   
        this.userDB.forEach((value, index) => console.log(`Usuario ${index} con id ${value.id}, con nombre ${value.name} y edad ${value.age}.`));
    }

    removeUser(id : number) : void{
        const indexUser = this.userDB.findIndex((_,index) => 
            this.userDB[index].id == id)
        if (!!indexUser)
            this.userDB.splice(indexUser);
        else
            console.log('Usuario no encontrado.')
    }

    findUser(param : number | string ) : [number, User | null]{
        
        let userindex : number;
        if (typeof param === "number")
            userindex = this.userDB.findIndex(user => user.id == param);
        else
            userindex = this.userDB.findIndex(user => user.name == param);
        if(userindex != -1)
            return [userindex, this.userDB[userindex]];
        else
            return [-1, null];
    }

    checkUser(user : User) : boolean{
        const check = this.userDB.find(param => param.id == user.id);
        if (!!check)
            return true;
        else
            return false;
    } 

    forEach(callback : (param : unknown) => unknown) : void{
        this.userDB.forEach(value => callback(value))
    }

    toString() : void{
        this.forEach((value) => console.log(JSON.stringify(value)))
    }
}


