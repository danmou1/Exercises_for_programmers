//inputs must be intergers
//no negative numbers
//must be made with functions
//single output statement with line breaks

const readline = require('readline');
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkInput(answer, resolve));
    });
};

function checkInput(answer, resolve){
    const number = parseFloat(answer);
    if (isNaN(answer) || answer < 0) {
        console.log('Invalid input. Please enter a non-negative number.');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    };
};



async function calculator() {
    const x = await askQuestion(rl, 'Enter the first number: ');
    const y = await askQuestion(rl, 'Enter the second number: ');

    console.log(`
        ${x} + ${y} = ${x+y}    \n
        ${x} - ${y} = ${x-y}    \n
        ${x} * ${y} = ${x*y}    \n
        ${x} / ${y} = ${x/y}    `);

        rl.close();
};

calculator();