const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

const filePath = path.join(__dirname, 'data.json');

function readFile() {
    return fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => {
            console.error('Error reading or parsing the file: ', err);
            throw err
        });
};

async function main() {
    try {
        const data = await readFile();
        const userInput = await prompt('Enter a search string: ');

        const searchResults = data.filter(o => {
            return (
                o["First Name"].toLowerCase().includes(userInput.toLowerCase()) ||
                o["Last Name"].toLowerCase().includes(userInput.toLowerCase()) ||
                o["Position"].toLowerCase().includes(userInput.toLowerCase())
            );
        });

        console.table(searchResults);
    } finally {
        rl.close();
    }
};

main();