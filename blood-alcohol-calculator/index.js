// this code looks ugly
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const LEGALBAC = 0.08;

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    });
};

function checkValue(answer, resolve) {
    const value = parseFloat(answer);

    if (isNaN(value) || value < 0) {
        console.log('Invalid value, please enter a positive number or zero.')
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(answer)
    }
};

function getGender(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkGender(answer, resolve));
    })
};

function checkGender(answer, resolve) {
    if (answer = 'm') {
        resolve(0.73);
    } else if (answer = 'f') {
        resolve(0.66);
    } else {
        console.log('Invalid gender.');
        getGender(rl, 'Try again. (m/f) ').then(resolve);
    }
};

async function calcBAC() {
    const weight = await askQuestion(rl, 'How much do you weight in pounds? ');
    const numDrinks = await askQuestion(rl, 'How many drinks did you have today? ');
    const alcVolume = await askQuestion(rl, 'How many ounces of alcohol each drink you consumed had? ');
    const time = await askQuestion(rl, 'How many hours have passed since your last drink? ');
    const rate = await getGender(rl, 'What is your gender? (m/f) ');

    let alcohol = numDrinks * alcVolume
    const BAC = (alcohol * 5.14 / weight * rate) - 0.015 * time;

    console.log(`Your BAC is ${BAC}.`)
    if (BAC >= LEGALBAC) {
        console.log('It is not legal for you to drive.');
    } else {
        console.log('It is legal for you to drive.');
    }

    rl.close();
};

calcBAC();