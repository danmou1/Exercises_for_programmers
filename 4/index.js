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
    const adverb2 = await askQuestion(rl, 'Now, for the second sentence, enter an adverb: ');
    const adjective2 = await askQuestion(rl, 'Enter an adjective: ');

    console.log(`Did you ${adjective} ${noun} ${verb} ${adverb}? That is ${adverb2} ${adjective2}!`);
    rl.close();
}


madLib();