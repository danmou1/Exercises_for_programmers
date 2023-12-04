const fs = require('fs').promises;
const path = require('path');

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
        const data = await readFile();

        const sortedArray = data.sort((a, b) => a["Last Name"].localeCompare(b["Last Name"]));

        console.table(sortedArray);
};

main();