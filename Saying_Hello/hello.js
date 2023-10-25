// for this exercise, it was required to keep input, concatenation and output separate.
// prompt-sync is required to emulate the window object in node, so that the code runs in the terminal.
const prompt = require('prompt-sync')();

let username = prompt('What is your name? ')
let greeting = `Hello, ${username}, nice to meet you!`

console.log(greeting);