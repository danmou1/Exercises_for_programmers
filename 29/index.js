const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (promptMessage) => new Promise ((resolve) => {
    rl.question(promptMessage, (answer) => validateInput(answer, promptMessage, resolve));
});

const validateInput = (answer, promptMessage, resolve) => {
    let number = parseFloat(answer);

    const errorMessage = errorHandling(number, answer);

    if (errorMessage) {
        clearLines(1);
        console.log(errorMessage);
        prompt(promptMessage).then(resolve);
    } else {
        resolve(number);
    }
    
};

const errorHandling = (number, answer) => {
    if (isNaN(number) || answer.trim() === "") {
        return "Sorry, that's not a valid input.";
    }
    
    if (number === 0) {
        return "The input cannot be zero.";
    }

    return null;
}

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};

const main = async () => {
    const returnRate = await prompt('What is the rate of return? ');

    const result = 72 / returnRate;

    console.log(result);
    
    rl.close();
};

main();