import readline from "readline"


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const prompt = (question) => {
    return new Promise ((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
};

const close = () => {
    rl.close();
};

export { prompt, close };