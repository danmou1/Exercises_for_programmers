//get unix timestamp
//if the program returns a negative number, assign the correct output

const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkInput(answer, resolve));
    });
};

function checkInput(answer, resolve) {
    const number = parseFloat(answer);
    if(isNaN(answer) || answer <= 0) {
        console.log('Invalid age, please enter a real number.');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(answer);
    }
};

async function calculator() {
    const age = await askQuestion(rl, 'What is your current age? ');
    const retireAge = await askQuestion(rl, 'At what age would you like to retire? ');
    const year = (new Date()).getFullYear();

    if (age < retireAge) {
        console.log(
            `You will be able to retire in ${retireAge - age} year(s).   \n` +
            `It's ${year}, so you can retire in ${year + (retireAge - age)}.`);
    } else if (age === retireAge) {
        console.log('You will be able to retire in less than a year.')
    } else {
        console.log(`You can already retire.`);
    }

    rl.close();
};

calculator();