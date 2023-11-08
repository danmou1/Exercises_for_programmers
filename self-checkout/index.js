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

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, answer => checkAnswer(answer, resolve));
    });
};

function checkAnswer(answer, resolve) {
    const number = parseFloat(answer); //I know floats shouldn't be used for currency, but I'll deal with this later.

    if (isNaN(number) || number <= 0) {
        console.log('Invalid value, please enter a number greater than 0.');
        askQuestion('Try again: ').then(resolve);
    } else {
        resolve(number);
    }
}

async function checkout() {
    const item_1 = await askQuestion(rl, 'Enter the price of item 1: ');
    const amount_1 = await askQuestion(rl, 'Enter the quantity of item 1: ');
    const total_1 = item_1 * amount_1;
    
    const item_2 = await askQuestion(rl, 'Enter the price of item 2: ');
    const amount_2 = await askQuestion(rl, 'Enter the quantity of item 2: ');
    const total_2 = item_2 * amount_2;

    const item_3 = await askQuestion(rl, 'Enter the price of item 3: ');
    const amount_3 = await askQuestion(rl, 'Enter the quantity of item 3: ');
    const total_3 = item_3 * amount_3;

    const subtotal = total_1 + total_2 + total_3;
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax;

    console.log(
        `Subtotal: ${subtotal} \n` +
        `Tax: ${tax} \n` +
        `Total: ${total}` 
    )
    rl.close();
}

checkout()