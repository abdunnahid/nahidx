#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

// Handlers
const routeHandler = require('./route');
const newProjectHandler = require('./new-project');

const intro = () => {
    console.log(
        chalk.red(
            figlet.textSync("Nahid Express", {
                font: "Pawp",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
    console.log('\n');
};

const askQuestions = () => {
    const questions = [
        {
            type: "list",
            name: "OPTION",
            message: "What do you want to create?",
            choices: ["Model", "Middleware", "Route", "New Project"]
        }
    ];
    return inquirer.prompt(questions);
};

const run = async () => {
    // show script introduction
    intro();

    // ask option
    const options = await askQuestions();
    // const { FILETYPE, FILENAME } = option;

    console.log(options.OPTION);
    

    // Execute option
    if (options.OPTION === 'Model') {
        console.log("Model Created!");
    }
    else if (options.OPTION === 'Middleware') {
        console.log("Middleware Created!");
    }
    else if (options.OPTION === 'Route') {
        const succeed = await routeHandler();
        if (succeed) {
            console.log(chalk.green("Route Created successfully! You are ready go."));
        }
    }
    else if (options.OPTION === 'New Project') {
        const succeed = await newProjectHandler();
        if (succeed) {
            console.log(chalk.green("Project Created successfully! You are ready go."));
        }
    }
};

run();