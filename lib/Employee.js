// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(name){
        this.name = name
    }

    getId(id){
        this.id = id

    }

    getEmail(email){
        this.email = email
    }

    getRole(){
        return "Employee"
    }
};

module.exports = Employee;