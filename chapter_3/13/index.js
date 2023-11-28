const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    });
};

function checkValue(answer, resolve) {
    let number = parseFloat(answer);
    if (isNaN(number) || number <= 0) {
        console.log('Invalid value, please enter a number greater than zero.');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function compoundInterest() {
    const principal = await askQuestion(rl, 'What is the principal amount? ');
    const rate = await askQuestion(rl, 'What is the rate? ');
    const years = await askQuestion(rl, 'How many years are to be elapsed? ');
    const compoundRate = await askQuestion(rl, 'How many times is the interest compounded per year? ');

    // P is counted in cents, fractions of cents are rounded up, value is corrected after logic occurs.
    const total = Math.ceil((principal * 100) * ((1 + ((rate/100)/compoundRate)) ** (compoundRate*years))) / 100;

    console.log(`$${principal} invested at ${rate} for ${years} years compounded ${compoundRate} times per year is $${total}. `)

    rl.close();
};

compoundInterest();