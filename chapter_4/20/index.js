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
        new County('Dunn', 0.004),
        new County('Other', 0)
    ])
];

//prompts for a string, will keep prompting until it's a number by calling checkNumber()
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
        resolve(0);
        return
    }

    //checking if the state contains a county
    if(state.counties) {
        resolve(await promptCounty(rl, state, 'From which county are you from? '));
    } else {
        resolve(state.salesTax);
    }
}

//prompts for county until there is an answer, by calling checkCounty() recursively otherwise
function promptCounty(rl, state, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkCounty(answer, state, resolve));
    });
};

function checkCounty(answer, state, resolve) {
    const lowercaseCounty = answer.toLowerCase();
    const county = state.counties.find(c => c.name.toLowerCase() === lowercaseCounty);

    if(!county) {
        console.log('Invalid county. In case you are not from either Dunn or Eau Claire, enter "other".');
        promptCounty(rl, state, 'Try again: ').then(resolve);
    } else {
        resolve({stateTax: state.salesTax, countyTax: county.salesTax});
    };
};

async function salesTaxCalc() {
    const order = parseInt(await promptNumber(rl, 'What is the order amount? '));
    const stateInfo = await promptState(rl, `What state do you live in? `);

    let tax;
    if (stateInfo === 0) {
        tax = stateInfo;
    } else {
        //precision garbage
        tax = Math.ceil(order * Math.round((stateInfo.stateTax + stateInfo.countyTax) * 1000) / 10);
    }
    
    const total = order + (tax / 100);

    console.log(
        `The tax is $${tax/100}. \n` +
        `The total is $${total}.`
        );

    rl.close();
};

salesTaxCalc();