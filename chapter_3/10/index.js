/**
 * Prompt for price and quantity of three items, then calculate the tax with a rate of 5.5%
 * Print out subtotal, tax and total.
 */
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const TAX_RATE = 0.055

function askValue(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, answer => dollarsToCents(answer, resolve));
    });
};

function askAmount(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, answer => checkAmount(answer, resolve));
    });
};

function checkAmount(answer, resolve) {
    let number = parseFloat(answer); 
    if (Number.isInteger(number) && number > 0) {
        resolve(number);
    } else {
        console.log('Invalid value, please enter an integer greater than 0.');
        askAmount(rl, 'Try again: ').then(resolve);
    };
};

function dollarsToCents(answer, resolve) {
    const floatPoint = answer.indexOf('.');
    const length = answer.length - 1;
    let number = parseFloat(answer) * 10 ** (length - floatPoint);

    if (isNaN(number) || number <= 0) {
        console.log('Invalid value, please enter a number greater than 0.');
        askValue(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

function centsToDollars(cents) {
    const number = String(cents);

    //if there are less than 100 cents, adds a leading 0 and returns the string.
    if (cents < 100) {
        return `0.${cents}`;
    }

    const floatPoint = number.length - 2;
    const pair = Array.from(number);
    
    pair.splice(floatPoint, 0, '.');
    return pair.join('');
};

async function checkout() {
    const item_1 = await askValue(rl, 'Enter the price of item 1: ');
    const amount_1 = await askAmount(rl, 'Enter the quantity of item 1: ');
    const total_1 = item_1 * amount_1;

    const item_2 = await askValue(rl, 'Enter the price of item 2: ');
    const amount_2 = await askAmount(rl, 'Enter the quantity of item 2: ');
    const total_2 = item_2 * amount_2;

    const item_3 = await askValue(rl, 'Enter the price of item 3: ');
    const amount_3 = await askAmount(rl, 'Enter the quantity of item 3: ');
    const total_3 = item_3 * amount_3;

    const subtotal = total_1 + total_2 + total_3;
    const tax = Math.round(subtotal * TAX_RATE)
    const total = subtotal + tax;

    console.log(
        `Subtotal: $${centsToDollars(subtotal)} \n` +
        `Tax: $${centsToDollars(tax)} \n` +
        `Total: $${centsToDollars(total)}`
    )
    rl.close();
};

checkout();
