const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees= [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
askQuestions();
//function to hold the inquirer prompts and just pass in parameters
function askQuestions(){
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is your/employees name?",
        validate: (name) => {
            if (name) {
                return true
            } else {
                console.log("Enter the name.")
                return false
            }
        }
    },
    {
        type: 'number',
        name: 'id',
        message: 'What is your/employees id number?',
        validate: value => isNaN(parseInt(value)) ? 'Please enter a number!': true 
    },
    {
        type: 'email',
        name: 'email',
        message: 'What is your/employees email address?',
        validate: (email) => {
            if (email) {
                return true
            } else {
                console.log('Enter a valid email address.')
                return false
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is your/emplyees role in the company?',
        choices: ['Manager', 'Engineer', 'Intern']
    }
]).then((response) => {
        switch (response.role) {
            case "Manager":
                inquirer.prompt({
                    type: 'number',
                    name: 'office',
                    message: "What is your office number?",
                    validate: value => isNaN(parseInt(value)) ? 'Please enter a number!': true
                }).then((answer) => {
                    employees.push(new Manager(response.name, response.id, response.email, response.role, answer.office));
                    //console.log(employees)
                    askAgain()
                });
                break;

            case "Engineer":
                inquirer.prompt({
                    type: 'input',
                    name: 'github',
                    message: 'What is your Github username?',
                    validate: (github) => {
                        if (github) {
                            return true
                        } else {
                            console.log("Enter your username.")
                            return false
                        }
                    }
                }).then((answer) => {
                    employees.push(new Engineer(response.name, response.id, response.email, response.role, answer.github));
                    //console.log(employees)
                    askAgain()
                });
                    break;
            case "Intern":
                inquirer.prompt({
                    type: 'input',
                    name: 'school',
                    message: 'What school did you go to?',
                    validate: (school) => {
                        if (school) {
                            return true
                        } else {
                            console.log("Enter your school's name.")
                            return false
                        }
                    }
                }).then((answer) => {
                    employees.push(new Intern(response.name, response.id, response.email, response.role, answer.school));
                    //console.log(employees)
                    askAgain()
                })
                break;
        }
    })

};

function askAgain(){
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'again',
            message: "Would you like to enter another employee?"

        }
    ]).then((response) => {
        if (response.again === true){
            askQuestions();
        } else {
            console.log(employees)
            makeTeam();
        }
    })
};
    
function makeTeam(){
    fs.writeFile('./output/team.html', render(employees), function (err) {
        if (err) throw err;
        console.log("Created!")
       })
};


