const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.on("close", () => process.exit(0));

const prompt = (choices) => new Promise((resolve) => {
    rl.question('', (answer) => checkChoice(choices, answer, resolve))
});

const checkChoice = (choices, answer, resolve) => {
    if (choices.includes(answer)) {
        resolve(answer);
    } else {
        clearLines(1);
        prompt(choices).then(resolve);
    }
};

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};

const firstChoice = async () => {
    console.log(
        `You wake up in a dark room, you look around and notice two doors, each accordingly numbered. What do you do? \n\n`+
        `1. Go through the first door.\n`+
        `2. Go through the second door. \n`+
        `3. Stay in this room.\n`
    );
    let pastChoices = [];
    let choices = ['1','2','3']
    let userChoice;
    do {
        userChoice = await prompt(choices);

        clearLines(5);
        switch (userChoice) {
            case '1':
                console.log('You chose to go through the first door.');
                break;
            case '2':
                console.log('You chose to go through the second door.');
                break;
            case '3':
                console.log('You chose to stay in this room.');
                break;
            default:
                console.log('Invalid choice. Exiting...');
            }
    } while (!choices.includes(userChoice));
    pastChoices.push(userChoice);

    rl.close();
};
firstChoice();