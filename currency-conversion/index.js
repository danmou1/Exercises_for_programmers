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

const PRECISION = 10000;

function askValue(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    })
};

function checkValue(answer, resolve) {
    const unit = parseFloat(answer) * PRECISION;
    if (isNaN(unit) || unit <= 0) {
        console.log('Invalid value, please enter a value greater than 0.');
        askValue(rl, 'Try again: ').then(resolve);
    } else {
        resolve(unit)
    }
}

async function currencyConversion() {
    const value = await askValue(rl, 'How many euros are you exchanging? ');    
    const exch_rate  = await askValue(rl, 'What is the current exchange rate? ');

    const conversion = (value * exch_rate) / (PRECISION ** 2) ;
    console.log( `${value / PRECISION} euros at the exchange rate of ${exch_rate / PRECISION} is ${conversion} dollars. \n` +
        `value = ${value / PRECISION} \n` +
        `exch_rate = ${exch_rate / PRECISION} \n` +
        `conversion = ${conversion}`
    )
    rl.close();
}

currencyConversion();