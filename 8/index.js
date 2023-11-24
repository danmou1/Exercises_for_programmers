//implement division with remainder
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, answer => checkAnswer(answer, resolve));
    });
};

function checkAnswer(answer, resolve) {
    const number = parseInt(answer);
    if (isNaN(number) || number <=0) {
        console.log('Invalid value. Please enter a number greater than 0.');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    };
};

async function calculator() {
    const people = await askQuestion(rl, 'How many people? ');
    const pizza = await askQuestion(rl, 'How many pizzas do you have? ');
    const slices = pizza*8;

    //calculate leftover slices
    let leftover = slices % people;

    //calculate how many slices each person gets
    let quotient = (slices - leftover) / people;

    console.log(
        `${people} people with ${pizza} pizza(s). \n` +
        `Each person get ${quotient} slice(s) of pizza. \n` +
        `There are ${leftover} leftover slices.`
    )
    rl.close();
};

calculator();