//inputs a string and then counts the characters of said string
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Insert a string for length evaluation: '
});

rl.prompt();

rl.on('line', (answer) => {
    if (answer.trim()) {
        console.log(`The string ${answer} contains ${answer.length} characters.`);
        rl.close();
        return;
    } 
    else {
        console.log(`Invalid string.`);
    }
    
    rl.prompt();
});