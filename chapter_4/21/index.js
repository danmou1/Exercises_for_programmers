/**TODO:
 * Convert indexs into its respective month
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// This is for whenever I want to implement the multiple languages challenge thing

// class Month {
//     constructor(index, name) {
//         this.index = index;
//         this.name = name;
//     };
// };

// const MONTHS = [
//     new Month(1, 'January'),
//     new Month(2, 'February'),
//     new Month(3, 'March'),
//     new Month(4, 'April'),
//     new Month(5, 'May'),
//     new Month(6, 'June'),
//     new Month(7, 'July'),
//     new Month(8, 'August'),
//     new Month(9, 'September'),
//     new Month(10, 'October'),
//     new Month(11, 'November'),
//     new Month(12, 'December')
// ];

const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function promptNumber(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkNumber(answer, resolve));
    });
};

function checkNumber(answer, resolve) {
    const number = parseFloat(answer);

    if (isNaN(number) || number <= 0 || number >= 13){
        console.log('Invaild value, please enter a number corresponding to a month.');
        promptNumber(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    };
};

async function monthConversion() {
    const userInput = await promptNumber(rl, `Please enter the number of the month: `);

    console.log(`The name of the month is ${MONTHS[userInput-1]}`);

    rl.close();
};

monthConversion();