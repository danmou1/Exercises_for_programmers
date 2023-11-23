/** TODO
 * for wisconsin residents, prompt for county, Eau Claire county has an additional 0.005 tax, Dunn county 0.004 tax
 * illinois residents are charged 0.08 sales tax, no additional county tax
 * other states are exempt
 *  
 * prompt order amoutn
 * prompt state
 * print tax
 * print total
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

class County {
    constructor(name, salesTax) {
        this.name = name;
        this.salesTax = salesTax;
    };
};

class State {
    constructor(abbreviation, name, salesTax, counties = []) {
        this.abbreviation = abbreviation;
        this.name = name;
        this.salesTax = salesTax;
        this.counties = counties;
    };
};

const states = [
    new State('IL', 'Illinois', 0.08),
    new State('WI', 'Wisconsin', 0.08, [
        new County('Eau Claire', 0.005),
        new County('Dunn', 0.004)
    ])
];

//prompts for a string, will keep prompting until it's a number.
function promptNumber(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    })
};

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number) || number <= 0){
        console.log('Invaild value, please enter a number greater than 0');
        promptNumber(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

//prompts for state, if state exists checks if counties exist, if they do, prompt for them
//if state doesn't exist, return 1
//if state exists but county doesnt, return only state tax, which is 0.08
function promptState(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkState(answer, resolve));
    });
};

async function checkState(answer, resolve) {
    const lowercaseState = answer.toLowerCase();
    const state = states.find(s => s.abbreviation.toLowerCase() === lowercaseState || s.name.toLowerCase() === lowercaseState);

    if (!state) {
        resolve(1);
    }

    //checking if the state contains a county
    if(state.counties && state.counties.length > 0) {
        await promptCounty(rl, state, 'From which county are you from? ');
    } else {
        resolve(state.salesTax);
    }
}

function promptCounty(rl, state, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkCounty(answer, state, resolve));
    });
};

function checkCounty(answer, state, resolve) {
    const lowercaseCounty = answer.toLowerCase();
    const county = state.counties.find(c => c.name.toLowerCase() === lowercaseCounty);

    if(!county) {
        console.log('Invalid county.');
        promptCounty(rl, state, 'Try again: ').then(resolve);
    } else {
        resolve({stateTax: state.salesTax, countyTax: county.salesTax});
    };
};

async function salesTaxCalc() {
    const order = await promptNumber(rl, 'What is the order amount? ');
    const stateInfo = await promptState(rl, `What state do you live in? `);

    console.log(stateInfo)

    rl.close();
};

salesTaxCalc();