'use strict'
//read four string inputs from the user and then create a string from it

//use a single output statement
//string interpolation is allowed

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve)
    });
}

async function madLib() {
    const noun = await askQuestion(rl, 'Enter a noun: ');
    const verb = await askQuestion(rl, 'Enter a verb: ');
    const adjective = await askQuestion(rl, 'Enter an adjective: ');
    const adverb = await askQuestion(rl, 'Enter an adverb: ');

    console.log(`Do you ${adjective} ${noun} ${verb} ${adverb}?`);
    rl.close();
}


madLib();