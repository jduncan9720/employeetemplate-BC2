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
function askQuestions(input, name){
inquirer.prompt([
    {
        type: input,
        name: name,
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
        validate: (id) => {
            if (id) {
                return true
            } else {
                console.log('Enter the ID number.')
                return false
            }
        }
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
])
    .then((response) => {
        switch (response.role) {
            case "Manager":
                inquirer.prompt({
                    type: 'number',
                    name: 'office',
                    message: "What is your office number?",
                    validate: (office) => {
                        if (office) {
                            return true
                        } else {
                            console.log("Enter your office number.")
                            return false
                        }
                    }
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
}
    
function makeTeam(){
    fs.writeFile('/output/team.html', render(employees), function (err) {
        if (err) throw err;
        console.log("Created!");
       })
}


// 1. Change employees to start as an empty array
// 2. Make sure each one has the role property on them (so that can be used later)
// 3. If all your console logs for them employees array are working as expected then I would just add one more inside the askAgain() 
//    function right before you pass it into the htmlRenderer function just to make sure it’s all correct
// 4. Where you have the renderer function called i would have it call a separate function that then does all the logic to create 
//    the html file and pass the data into renderer- for example that function could be called makeTeam()
// 5. Inside the makeTeam() function- you’ll check to make sure the file exists using the output_dir- and then if it does exist 
//    you’ll pass the whole employee array inside the render function which will be called inside of the writeFileSync function 
//    (this will take the returned item from the render(employees) and along with the outputPath and create the files - So look up 
//    syntax for fs.writeFileSync

// You’re super close! Just reformat employees- and pass that in and that should help get you in the right direction!

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
