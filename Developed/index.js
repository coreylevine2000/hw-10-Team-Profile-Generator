//Main file

//Require consts
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

//Positions
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Outcome files
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

//Questionair for inquirer
const questions = [
    {
      type: "list",
      message: "What is your role?",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your ID?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "github",
      when: (response) => response.role === "Engineer",
    },
    {
      type: "input",
      message: "What school did you attend?",
      name: "school",
      when: (response) => response.role === "Intern",
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
      when: (response) => response.role === "Manager",
    },
    {
      type: "list",
      message: "Do you want to add another employee?",
      name: "add",
      choices: ["Yes", "No"],
    },
  ];
  
  //Inquirer init
  const init = () => inquirer
    .prompt(questions)
  //Element for position
    .then(createTeam);
  
  
  //Adds all team info to specific employee
  function createTeam(response) {
    let employee;
    if (response.role === "Engineer") {
      employee = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
    } else if (response.role === "Intern") {
      employee = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
    } else if (response.role === "Manager") {
      employee = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
    }
    //Blank array pushed with employee responses
    employees.push(employee);
  
    if (response.add === "Yes") {
      init();
    } else {
      console.log("Thank you for your input.");
    }
    fs.writeFile(outputPath, render(employees), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }
  init();
  
  