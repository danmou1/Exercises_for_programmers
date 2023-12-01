const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

const isEven = (number) => number % 2 ? true : false;

function filterEvenNumbers(userInput) {
    let stringArray = userInput.split(" ");
    
    const numberArray = stringArray.map(str => parseFloat(str));
    
    for (let i = 0; i < numberArray.length; i++) {
        if (isEven(numberArray[i])) {
            numberArray.splice(i, 1)
        }
    }
    
    return stringArray = numberArray.join(" ");
};

async function main() {
    const userInput = await prompt('Enter a list of numbers, separated by spaces: ');
    const numbers = filterEvenNumbers(userInput);

    console.log(`The even numbers are: ${numbers}`);

    rl.close();
};

main();