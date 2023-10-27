// for this exercise, it was required to keep input, concatenation and output separate.
const readline = require('node:readline');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name? ', (answer) => {
    console.log(`Hello, ${answer}, nice to meet you!`);

    rl.close();
});