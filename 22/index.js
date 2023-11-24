/**TODO:
 * challenges
 */

const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function promptNumber(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number)){
        console.log('Invaild value, please enter a number.');
        promptNumber(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    };
};

async function calc() {
    const numbers = [
        await promptNumber(rl, 'Insert the first number: '),
        await promptNumber(rl, 'Insert the second number: '),
        await promptNumber(rl, 'Insert the third number: ')
    ];

    if (numbers[0] === numbers[1] && numbers[0] === numbers[2]) {
        console.log('All numbers are equal.');
        rl.close();
        return
    }

    let maxNumber = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if(numbers[i] > maxNumber) {
            maxNumber = numbers[i];
        }
    }

    console.log(`The largest number is ${maxNumber}`);

    rl.close();
};

calc();