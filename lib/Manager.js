// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');

class Manager{
    constructor(officeNumber){
        this.officeNumber = officeNumber
    }

    getOffice(){
        console.log(this.officeNumber)
        return this.officeNumber  
    }

    getRole(){
        return "Manager"
    }
};

module.exports = Manager;