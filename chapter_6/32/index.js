//this code is ugly and I will refactor it someday
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const LINES = 2;

const promptGuess = (promptMsg) => new Promise ((resolve) => {
    rl.question(promptMsg, (answer) => validateInput(promptMsg, answer, resolve));
});

const validateInput = (promptMsg, answer, resolve) => {
    const number = parseFloat(answer);

    const errorMessage = errorHandling(answer, number);

    if (errorMessage) {
        clearLines(LINES);
        console.log(errorMessage);
        promptGuess(promptMsg).then(resolve);
    } else {
        resolve(number);
    }
};

const promptDifficulty = (promptMsg) => new Promise ((resolve) => {
    rl.question(promptMsg, (answer) => {
        const difficulties = [1, 2, 3];
        const number = parseFloat(answer);

        const errorMessage = errorHandling(answer, number);
        
        
        if (difficulties.includes(number)) {
            resolve(number);
        } else if (errorMessage) {
            clearLines(LINES);
            console.log(errorMessage);
            promptGuess(promptMsg).then(resolve);
        } else {
            clearLines(LINES);
            console.log('Invalid difficulty.');
            promptGuess(promptMsg).then(resolve);
        }
    });
});

const getRandomInt = (difficulty) => {
    let min = 1;
    let max;
    switch (difficulty) {
        case 1:
            max = 10;
            break;
        case 2:
            max = 100;
            break;
        case 3:
            max = 1000;
            break;
        default:
            console.log('error');
    }

    console.log(`Difficulty ${difficulty}; The number will be between ${min} and ${max}.`)
    
    return Math.floor(Math.random() * (max - min) + min);
};

const errorHandling = (answer, number) => {
    if (isNaN(number) || answer.trim() === '') {
        return "Invalid input, it must be numeric.";
    }
    if (number === 0) {
        return "Invalid input, it must be greater than zero.";
    }

    return null;
};

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};

const getEndMessage = (guessNumber) => {
    if (guessNumber === 1) {
        console.log(`You're a mind reader! You got it in ${guessNumber} guess!`);
    } else if (guessNumber <= 3) {
        console.log(`Most impressive. You got it in ${guessNumber} guesses.`);
    } else if (guessNumber <= 6) {
        console.log(`You got it in ${guessNumber} tries. You can do better than that.`);
    } else {
        console.log(`Better luck next time, you guessed ${guessNumber} times.`);
    }
};


const playAgain = () => {
    rl.question('Play again? (y/n) ', (answer) => {
        if (answer.trim() === 'y') {
            guessTheNumber();
        } else {
            console.log("Goodbye!");
            rl.close();
            return
        }
    });
}; 

const guessTheNumber = async () => {
    const difficulty = await promptDifficulty('Pick a difficulty level (1, 2 or 3): ');
    const number = getRandomInt(difficulty);
    
    let guess = await promptGuess("I have my number. What's your guess? ");
    let guessNumber = 0;

    do {
        if (guess > number) {
            guess = await promptGuess("Too high. Guess again: ");
            guessNumber++
        } else if (guess < number) {
            guess = await promptGuess("Too low. Guess again: ");
            guessNumber++
        }
    } while (guess !== number)

    getEndMessage(guessNumber);

    playAgain();
};

const main = () => {
    guessTheNumber();
}
main();