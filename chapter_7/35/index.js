const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

class FileError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileError';
    }
}

class JsonError extends Error {
    constructor(message) {
        super(message);
        this.name = "JsonError";
    }
}

class DataHandler {
    constructor(fileName) {
        this.filePath = path.join(__dirname, fileName);
    }

    async readData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            throw new FileError(`Error reading the file: ${error.message}`);
        }
    }

    async writeData(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            throw new JsonError(`Error writing to the file: ${error.message}`);
        }
    }

    async removeData(name) {
        try {
            const data = await this.readData();
            const index = data.findIndex(o => o.name === name);

            if (index !== -1) {
                data.splice(index, 1);
            } else {
                console.warn(`"${name}" does not exist.`);
            }

            await this.writeData(data);

            return data;
        } catch (error) {
            throw new JsonError(`Error removing data: ${error.message}`);
        }
    }
}

const dataHandler = new DataHandler('data.json')


const prompt = (message) => new Promise ((resolve) => rl.question(message, resolve));

//add winner to JSON
async function getUserInput() {
    const names = await dataHandler.readData();

    while (true) {
        const userInput = await prompt('Enter a name: ');

        if (userInput === '') {
            break;
        }

        names.push({name: userInput});
    }

    await dataHandler.writeData(names);

    return names
};

//get index of winner
function getRandomInt(max) {
    let min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

async function main() {
    let array = await getUserInput();
    let index = getRandomInt(array.length);

    //remove winner
    dataHandler.removeData(array[index].name);

    console.log(`The winner is: ${array[index].name}`);

    rl.close();
};

main();