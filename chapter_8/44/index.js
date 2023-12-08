const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const productQuery = (promptMessage) => new Promise((resolve) => rl.question(promptMessage, (answer) => {
    getProduct(answer, promptMessage, resolve);
}));

async function readFile() {
    const filePath = path.join(__dirname, 'data.json');
    
    return await fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => {
            console.error('Error reading or parsing the file: ', err);
            throw err
        });
};

async function getProduct(answer, promptMessage, resolve) {
    const content = await readFile();

    const searchResults = content.products.filter(o => {
        return o["name"].toLowerCase().includes(answer.toLowerCase())
    });

    if (searchResults.length > 0) {
        resolve(searchResults[0]);
    } else {
        console.log('Sorry, that product was not found');
        productQuery(promptMessage).then(resolve);
    }
};

async function main() {
    const data = await productQuery('What is the product name?\n');
    console.log(
        `Name: ${data.name}\n` +
        `Price: $${data.price}.00\n` +
        `Quantity on hand: ${data.quantity}`
    );

    rl.close();
};

main();