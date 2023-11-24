/**TODO
 * 
 * prompt for password, check password, then print 'welcome' or 'i don't know you'
 * 
 * use if/else statement
 * should be case sensitive
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const pass = 'abc123';

rl.question('What is the password? ', (answer) => {
    if (answer === pass) {
        console.log('Welcome!');
        rl.close();
    } else {
        console.log(`I don't know you!`);
        rl.close();
    }
});