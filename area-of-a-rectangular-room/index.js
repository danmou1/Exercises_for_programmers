//calculations must be separate from output
//conversion value variable must be a constant
//inputs must be numeric
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUnit(rl, prompt){
    return new Promise((resolve) => {
        rl.question(prompt, (answer => checkUnit(answer, resolve)));
    });
};

function checkUnit(answer, resolve) {
    let primaryUnit, oppositeUnit;

    switch (answer.toLowerCase()) {
        case 'y':
            primaryUnit = 'm';
            oppositeUnit = 'ft';
            verboseUnit = 'meters';
            break;
        case 'n':
            primaryUnit = 'ft';
            oppositeUnit = 'm';
            verboseUnit = 'feet';
            break;
        default:
            primaryUnit, oppositeUnit = null;
            break;
    }
    
    resolve({primaryUnit, oppositeUnit, verboseUnit});
};

function askNumber(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};  

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number) || number === 0) {
        console.log('Invalid number.');
        askNumber(rl, 'Please try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function areaCalc(){
    const units = await askUnit(rl, 'Do you wish to use meters as the measuring unit? (y/n) ');
    const length = await askNumber(rl, `Please enter the length of the room in ${units.verboseUnit}: `);
    const width = await askNumber(rl, `Please enter the width of the room in ${units.verboseUnit}: `);
    
    //calculate the area
    let area = length * width;

    //feet to meters conversion value
    const CONVERSION_VALUE = 0.09290304;

    //performing unit conversion
    let areaConversion = units.primaryUnit === 'ft' ? area * CONVERSION_VALUE : area / CONVERSION_VALUE;

    console.log(
        `You entered the following dimensions:\n` +
        `Length: ${length}.\n` +
        `Width: ${width}.\n` +
        `The area is: ${area}${units.primaryUnit}², or ${areaConversion}${units.oppositeUnit}².`
    );

    rl.close();
};

areaCalc();