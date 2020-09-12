const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require('./lib/Employee');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
let employees = [/*this is where all the employees are going to end up*/]


//FUNCTION TO FIND OUT THE TYPE OF EMPLOYEE, put the line below (18) to intiate the process.
employeeType();
function employeeType() {
inquirer
    .prompt([
        //1st promt
        {
            type: "list",
            name: "role",
            message: "What is this team-members role?",
            choices: ["Manager", "Intern", "Engineer", ]
        },
    ])
    .then(function(answers) {
        const role = answers.role;
        if (role === "Intern") {
            internQuestions();
        }
        else if (role === "Engineer") {
            engineerQuestions();
        }
        else if (role === "Manager") {
            managerQuestions();
        }  
    });
}    

// IF CHOSEN MANAGER FUNCTION
function managerQuestions() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's Office Number?"
        },
    ]) .then(function (answers) {
        const manager = new Manager(answers.name, answers.email, answers.id, answers.officeNumber);
        employees.push(manager)
        buildEmployees();
    })
}

// IF CHOSEN ENGINEER FUNCTION
function engineerQuestions() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's Github username?"
        },
    ]) .then(function (answers) {
        const engineer = new Engineer(answers.name, answers.email, answers.id, answers.github);
        employees.push(engineer)
        buildEmployees();
    })
}

// IF CHOSEN INTERN FUNCTION
function internQuestions() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the Intern's School Name?"
        },
    ]) .then(function (answers) {
        const intern = new Intern(answers.name, answers.email, answers.id, answers.school);
        employees.push(intern)
        buildEmployees();
    })
}

//THIS FUNCTION IS USED TO EITHER BUILD THE TEAM IN HTML OR ADD ANOTHER EMPLOYEE WHICH SHOOTS YOU UP TO THE TOP
function buildEmployees() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "build",
            message: "Would you like to build your team or add another Employee? (Use arrow keys)",
            choices: ["Build Team", "Add Employee"]
        }
    ]) .then(function(answers) {
        if(answers.build === "Build Team") {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFileSync(outputPath, render (employees))
        } else {
            employeeType();
        }

    })
}
// and to create objects for each team member (using the correct classes as blueprints!)


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
// for the provided `render` function to work! ``
