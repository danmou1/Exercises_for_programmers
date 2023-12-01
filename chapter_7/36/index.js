const { parse } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise ((resolve) => rl.question(message, answer => resolve(answer.trim())));

async function getUserInput() {
    let numbers = [];
    while (true) {
        const userInput = await prompt('Enter a number: ');

        if (userInput === 'done') {
            break
        }

        const parsedNumber = parseFloat(userInput);
        if(!isNaN(parsedNumber)) {
            numbers.push(parsedNumber);
        } else {
            console.log('Invalid input, please enter a valid number.');
        }
    }
    return numbers;
};

function getAverage(numbersArray) {
    let avg = 0;

    for (let i = 0; i < numbersArray.length; i++) {
        avg += numbersArray[i];
    }

    return avg / numbersArray.length;
};

function getMinimum(numbersArray) {
    let minimum = numbersArray[0];

    for (let i = 1; i < numbersArray.length; i++) {
        if (numbersArray[i] < minimum) {
            minimum = numbersArray[i];
        }
    }

    return minimum;
};

function getMaximum(numbersArray) {
    let maximum = numbersArray[0];

    for (let i = 1; i < numbersArray.length; i++) {
        if (numbersArray[i] > maximum) {
            maximum = numbersArray[i];
        }
    }

    return maximum;
};

function getStandardDeviation(average, numbersArray) {
    let squaredDifferences = [];

    //calculate difference, square it and push it to squaredDifferences
    for (let i = 0; i < numbersArray.length; i++) {
        squaredDifferences.push((numbersArray[i] - average) ** 2);
    }

    //sqrt of the mean of squaredDifferences
    return Math.sqrt(getAverage(squaredDifferences));
};

async function main () {
    const numbersArray = await getUserInput();
    const average = getAverage(numbersArray);
    const minimum = getMinimum(numbersArray);
    const maximum = getMaximum(numbersArray);
    const stdDeviation = getStandardDeviation(average, numbersArray);

    console.log(average, minimum, maximum, stdDeviation);
    rl.close();
};

main();