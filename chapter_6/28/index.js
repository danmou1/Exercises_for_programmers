const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (prompt) => new Promise((resolve) => {
    rl.question(prompt, (answer) => checkAnswer(answer, resolve, prompt));
});

const checkAnswer = (answer, resolve, prompt) => {
    let number = parseFloat(answer);

    if (!isNaN(number) && answer.trim() !== "") {
        resolve(number);
    } else {
    clearLines(1);
    console.log('Invalid number, try again. ');
    prompt(prompt).then(resolve);
    }
};

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};

const main = async () => {
    let indexLength;
    do {
        indexLength = await prompt('How many numbers do you wish to calculate the sum of? ');
    } while (indexLength === 0);

    let numbersArray = [];
    do {
        numbersArray.push(await prompt('Enter a number: '));
    } while (numbersArray.length < indexLength);

    const initialValue = 0;
    const arraySum = numbersArray.reduce((callback, index) => callback + index, initialValue);

    console.log(`The sum of the numbers is: ${arraySum}.`);
    rl.close();
};

main();