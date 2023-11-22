/** TODO
 * 
 * create a program that converts fahrenheit into celsius and vice versa, based on user input.
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
function getUnit(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            if (answer.toLowerCase() == 'c' || answer.toLowerCase() == 'f') {
                resolve(answer.toLowerCase());
            } else {
                console.log(`Invalid unit, please enter either "C" or "F".`);
                getUnit(rl, "Try again: ").then(resolve);
            }
        });
    });
};

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    });
};

function checkValue(answer, resolve) {
    const number = parseFloat(answer);
    if(isNaN(number)) {
        console.log('Invalid number, please enter a real number.');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function unitConversion() {
    const unitInput = await getUnit(rl, `Press "C" to convert from Fahrenheit to Celsius. \n` + `Press "F" to convert from Celsius to Fahrenheit. \n` + `Your choice: `);
    let primaryUnit = unitInput === 'c' ? 'Fahrenheit': 'Celsius'; //user cannot input anything other than 'c' or 'f', therefore this is viable.
    let secondaryUnit = unitInput === 'c' ? 'Celsius' : 'Fahrenheit';

    const temperature = await askQuestion(rl, `Please enter the temperature in ${primaryUnit}: `);

    let conversion
    if (primaryUnit === 'Fahrenheit') {
        conversion = (temperature - 32) * 5/9;
    } else {
        conversion = (temperature * 9/5) + 32;
    }

    console.log(`The temperature in ${secondaryUnit} is ${conversion}.`);

    rl.close();
}
unitConversion();