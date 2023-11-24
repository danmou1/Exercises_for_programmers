/** TODO
 * 
 * prompt for age
 * print wether they're of legal driving age
 * 
 * use ternary operator
 * single output statement
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const drivingAge = 16;

rl.question('What is your age? ', (answer) => {
    answer < drivingAge ? console.log('Too young to drive.') : console.log('You are old enough to drive.')
    rl.close();
});