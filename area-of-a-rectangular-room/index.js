//calculations must be separate from output
//conversion value variable must be a constant
//inputs must be numeric
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const CONVERSION_VALUE = 0.09290304;

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkInput(answer, resolve));
    });
};  

function checkInput(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number)) {
        console.log('Invalid number.');
        askQuestion(rl, 'Please try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

//close enough, idk how to make the precision better
async function areaCalc(){
    const length = await askQuestion(rl, 'Please enter the length of the room in feet: ');
    const width = await askQuestion(rl, 'Please enter the width of the room in feet: ');
    const areaFt = length * width;
    const areaM = areaFt * CONVERSION_VALUE;

    console.log(
        `You entered the following dimensions:\n` +
        `Length: ${length}.\n` +
        `Width: ${width}.\n` +
        `The area is: ${areaFt}ft², or ${areaM}m².`
    );

    rl.close();
};  

areaCalc();