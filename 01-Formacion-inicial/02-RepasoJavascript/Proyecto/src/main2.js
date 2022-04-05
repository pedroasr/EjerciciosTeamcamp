function user() {
    let users = [];

    function addUser(name, age) {
        users.push({ name, age });
    }

    function delUser(name) {
        users.splice(filter(u => name !== u.name));
    }

    function getUsers() {
        return users.slice();
    }

    function getUser(name) {
        return users.find(u => name === u.name);
    }
    
    function forEach(callback) {
        for (let i = 0; i<users.length; i++)
            callback(users[i]);
    }

    function toString() {
        users.forEach(element => {
            console.log(`El usuario ${element.name} tiene ${element.age} años.`);
        });
    }    


    // API
    return {
        addUser,
        delUser,
        getUsers,
        getUser,
        forEach,
        toString
    };
}