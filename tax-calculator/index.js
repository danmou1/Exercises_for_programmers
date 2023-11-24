//exercise didn't ask for any variable checking, just extreme simplicity
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => rl.question(prompt, resolve))
};

async function taxCalc() {
    const order = parseInt(await askQuestion(rl, 'What is the order amount? '));
    const state = await askQuestion(rl, 'Which state are you from? ');
    let rate = 0
    if (state === 'WI') {
        rate = 0.055;
    }

    console.log(
        `The subtotal is $${order} \n` +
        `The tax is $${order * rate} \n` +
        `The total is $${order + order * rate} \n`
    )

    rl.close();
};
taxCalc();