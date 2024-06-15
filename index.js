#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = 'Do know how to code?';
    figlet(rainbowTitle, {
        font: 'Cybermedium',
    },(err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
    await sleep();

    console.log(`
        ${chalk.bgBlue('QUIZZ RULES')}
        You just need to answer the questions correctly.
        If you get any question wrong, you will be declared ${ chalk.bgRed('NOT')} a coder.
        So get all the questions right...
        `);
}


async function askName() {
const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: "What's your name?",
    default(){
        return 'MAYBE a coder';
        },
        });
        
    playerName = answers.player_name
}

async function question1() {
    const answer = await inquirer.prompt({
        name: 'FrontEndQuestion',
        type: 'list',
        message: 'How to center a div?',
        choices: [
            'A) Set text-align: center on the parent element.',
            'B) Apply margin: auto to the div.',
            'C) Use padding: center on the div.',
            'D) Set align-items: middle on the parent container.',
        ],
    });
    return handleAnswer(answer.FrontEndQuestion == 'B) Apply margin: auto to the div.');
}

async function question2() {
    const answer = await inquirer.prompt({
        name: 'BackEndQuestion',
        type: 'list',
        message: 'Which HTTP method is used to retrieve data from a server?',
        choices: [
            'A) POST.',
            'B) DELETE.',
            'C) PUT.',
            'D) GET.',
        ],
    });
    return handleAnswer(answer.BackEndQuestion == 'D) GET.');
}


async function question3() {
    const answer = await inquirer.prompt({
        name: 'DBQuestion',
        type: 'list',
        message: 'Which SQL command is used to retrieve data from a database?',
        choices: [
            'A) INSERT.',
            'B) DELETE.',
            'C) SELECT.',
            'D) UPDATE.',
        ],
    });
    return handleAnswer(answer.DBQuestion == 'C) SELECT.');
}

async function question4() {
    const answer = await inquirer.prompt({
        name: 'SOLIDQuestion',
        type: 'list',
        message: 'What does the "S" in SOLID principles stand for?',
        choices: [
            'A) Single Responsibility Principle.',
            'B) Static Typing Principle.',
            'C) Simple Class Principle.',
            'D) Secure Coding Principle.',
        ],
    });
    return handleAnswer(answer.SOLIDQuestion == 'A) Single Responsibility Principle.');
}

async function question5() {
    const answer = await inquirer.prompt({
        name: 'SQLQuestion',
        type: 'list',
        message: 'Which of the following is a NoSQL database?',
        choices: [
            'A) MySQL.',
            'B) PostgreSQL.',
            'C) MongoDB.',
            'D) SQLite.',
        ],
    });
    return handleAnswer(answer.SQLQuestion == 'C) MongoDB.');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect) {
        spinner.success({ text: `Nice work ${ playerName }.`});
    } else {
        spinner.error({ text: `Game OVER, you are ${ chalk.bgRed('NOT')} a coder, ${ playerName }!` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const winnerMsg = `Congrats, ${ playerName }!\n YOU ARE A CODER`

    figlet(winnerMsg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();