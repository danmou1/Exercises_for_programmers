/** TODO:
 *  - Fix the code.
 *  - Learn how promises actually work.
 */
/** 
 * Always round minorUnit up.
 * Single output statement.
 */
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * This application uses USD as a baseline currency.
 */
EUR_RATE = 1.07

function askValue(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, answer => convertIntoMinor(answer, resolve));
    });
};

function convertIntoMinor(answer) {

    //splits the string into an array, reverses the array, joins it back into a string
    const str = String(answer).split('').reverse().join('');
    const floatPoint = str.indexOf('.');

    //ensures that the float becomes an integer by raising its decimal place
    let unit = parseFloat(answer) * 10 ** floatPoint;

    if (isNaN(unit) || unit <=0) {
        console.log('Invalid value, please enter a unit greater than 0.');
        askValue(rl, 'Try again: ').then(resolve);
    } else {
        return({unit, floatPoint}).then(resolve);
    }
};

function convertIntoMajor(minorUnit, floatPoint) {
    let number = String(minorUnit);

    if (minorUnit < 100) {
        return `0.${minorUnit}`
    }

    //adds the floating point to the specified value
    const unit = number.splice(floatPoint, 0, '.');
    return unit.join('');
}

async function currencyConversion() {
    const value = await askValue(rl, 'How many euros are you exchanging? ');
    const exch_rate = convertIntoMinor(EUR_RATE); 
    const conversion = value.unit * exch_rate.unit / 10 ** exch_rate.floatPoint

    console.log(
        `value = ${value} /n
        exch_rate = ${exch_rate} /n
        conversion = ${conversion}`
    )
    rl.close();
}

currencyConversion();