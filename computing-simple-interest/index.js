/** TODO:
 * round up
 */
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    })
};

function checkValue(answer,resolve) {
    const unit = parseFloat(answer)
    if (isNaN(unit) || unit <= 0){
        console.log('Invaild value, please enter a number greater than 0');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(unit);
    }
};

async function interestCalc(){
    const principal = await askQuestion(rl, 'Enter the principal: ') * 100;
    const rate = await askQuestion(rl, 'Enter the interest rate: ');
    const years = await askQuestion(rl, 'Enter the number of years: ');

    /**
     * A = P(1+rt)
     * This logic looks cryptic
     * P is counted as cents, rate as a percentage, values are corrected at the end of the logic.
     */
    const total = Math.ceil(principal * (1 + (rate / 100) * years)) / 100;

    console.log(`After ${years} years at ${rate}%, the investment will be worth $${total}`);
    rl.close();
}

interestCalc();