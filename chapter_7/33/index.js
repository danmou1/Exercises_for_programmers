const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
};

rl.question("What's your question? ", () => {
    const answers = ['Yes.', 'No.', 'Maybe.', 'Ask again later.'];
    
    let index = getRandomInt(0, 3);

    console.log(answers[index]);

    rl.close();
});