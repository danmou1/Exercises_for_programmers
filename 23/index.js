/**TODO:
 * mucho texto, read the book
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    });
};

function checkValue(answer, resolve) {
    if(answer === 'y' || answer === 'n') {
        resolve(answer);
    } else {
        console.log('Invalid answer.')
        askQuestion(rl, 'Try again (y/n): ').then(resolve);
    };
};

//how do I make this not look ugly
async function decisionTree() {
    const answer1 = await askQuestion(rl, 'Is the car silent when you turn the key? ');
    if (answer1 === 'y') {
        const answer2 = await askQuestion(rl, 'Are the battery terminals corroded? ')
        if (answer2 === 'y') {
            console.log('Clean terminals and try starting again.');
        } else {
            console.log('Replace cables and try again.');
        }
    } else {
        const answer2 = await askQuestion(rl, 'Does the car make a clicking noise? ');
        if (answer2 === 'y') {
            console.log('Replace the battery.');
        } else {
            const answer3 = await askQuestion(rl, 'Does the car crank up but fail to start? ');
            if (answer3 === 'y') {
                console.log('Check spark plug connections.');
            } else {
                const answer4 = await askQuestion(rl, 'Does the engine start and then die? ');
                if (answer4 === 'y') {
                    const answer5 = await askQuestion(rl, 'Does your car have fuel injection? ');
                    if (answer5 === 'y') {
                        console.log('Get it in for service.');
                    } else {
                        console.log('Check to ensure the choke is opening and closing.');
                    }
                } else {
                    console.log('He left this part of the book empty :)');
                };
            };
        };
    };

    rl.close();
};

decisionTree();