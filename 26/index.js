/**TODO:
 * prompt balance
 * prompt APR
 * prompt monthly payment
 * 
 * return months needed to pay
 * 
 * FORMULA: n = -(1/30) * log(1+(b/p)(1-(1+1)**30))/log(1+i)
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const PRECISION = 100

function promptNumber(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);
    if (!isNaN(number) && number > 0) {
        resolve(number);
    } else {
        console.log('Invalid value, please enter a real number.');
        promptNumber(rl, 'Try again: ').then(resolve);
    };
};

function calculateMonthsUntilPaidOff(balance, APR, payment) {
    const i = (APR/100) / 365;
    const b = balance;
    const p = payment;
    const log = Math.log;

    //calculates the months necessary to pay off the credit card debt
    const months = -(1/30) * log(1 + (b/p) * (1 - (1+i) ** 30)) / log(1+i);

    const roundedMonths = Math.ceil(months);

    return roundedMonths;
};

async function main() {
    const userInput = [
        await promptNumber(rl, 'What is your balance? ') * PRECISION,
        await promptNumber(rl, 'What is the APR percentage on the card? '),
        await promptNumber(rl, 'What is the monthly payment you can make? ') * PRECISION
    ]

    const months = calculateMonthsUntilPaidOff(userInput[0], userInput[1], userInput[2]);

    console.log(`It will take you ${months} months to pay off this card.`);

    rl.close();
};

main();