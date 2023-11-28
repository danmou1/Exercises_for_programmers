//conversion value variable must be a constant
//inputs must be numeric
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function YesOrNo(prompt){
    return new Promise((resolve) => {
        console.log(prompt);

        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.on('keypress', (key) => {
            if (key === 'y' || key === 'n') {
                resolve(key);
                process.exit;
            }
        });
    });
};

async function getUnits() {
    let primaryUnit, oppositeUnit, verboseUnit;
    const userInput = await YesOrNo('Would you like to use meters as the measuring unit? (y/n)');
    
    switch (userInput) {
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
    }

    return {primaryUnit, oppositeUnit, verboseUnit}
}

function askNumber(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};  

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number) || number <=0 ) {
        console.log('Invalid number.');
        askNumber(rl, 'Please try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function areaCalc() {
    const units = await getUnits();
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
    
    /**
     * Confused as to why the output for the YesOrNo() function remains in the terminal, following said output.
     *      "Would you like to use meters as the measuring unit? (y/n)
     *       Please enter the length of the room in feet: n"
     * While you can delete the text from the terminal, it still confuses me as to why it is even written there.
     */