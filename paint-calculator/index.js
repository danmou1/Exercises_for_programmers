//conversion rate should be a constant
//always round up
//calculate how many gallons of paint are necessary to paint a room
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const PAINT_COVERAGE = 350;

function askNumber(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number) || number <= 0) {
        console.log('Invalid value. Please enter a number greater than 0.');
        askNumber('Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function calculate(){
    const length = await askNumber(rl, 'Insert the length of the room you wish to paint: ');
    const height = await askNumber(rl, 'Insert its height: ');

    const area = length * height;
    const buckets = Math.ceil(area / PAINT_COVERAGE);

    console.log(`You will need to purchase ${buckets} bucket(s) of paint to cover ${area} square feet.`);

    rl.close();
}

calculate();