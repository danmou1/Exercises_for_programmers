const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

class DataHandler {
    constructor(fileName) {
        this.filePath = path.join(__dirname, fileName);
    };
    
    async readData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data) || []; 
        } catch (error) {
            if (error.code === 'ENOENT') {
                //file doesnt exist, create empty file
                await fs.writeFile(this.filePath, '[]', 'utf-8');
            } else {
                throw new Error(`Error reading the file.`); 
            }
        }
    }
    
    async writeData(object) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(object, null, 2), 'utf-8');
        } catch {
            throw new Error(`Error writing to the file.`);
        }
    }
};

const dataHandler = new DataHandler('data.json');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise ((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

async function getUserInput() {
    const data = await dataHandler.readData();

    while (true) {
        const lastname = await prompt('Enter the last name: ');
        const firstname = await prompt('Enter the first name: ');

        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/; 

        //in case of error
        if (!regex.test(firstname) || !regex.test(lastname)) {
            console.log("Invalid input. Exiting program.");
            break;
        }

        data.push({firstname: firstname, lastname: lastname});

        //prompts for recursion
        const retry = (await prompt('Do you wish to enter another object? (y/n) ')).trim().toLowerCase();
        if (retry === 'n') {
            console.log("Exiting program.")
            break;
        }
        console.log("Retrying.");
    }

    await dataHandler.writeData(data);

    return data
};

async function printSortedArray() {
    const data = await dataHandler.readData();
    const sortedArray = data.sort((a, b) => a.lastname.localeCompare(b.lastname));

    rl.close();

    console.log(
        `Total of ${sortedArray.length} names\n` +
        `-----------------`
        );
    for (let i = 0; i < sortedArray.length; i++) {
        console.log(`${sortedArray[i].lastname}, ${sortedArray[i].firstname}`);
    }
};

async function main() {
    const willInput = (await prompt("Do you wish to input data to the database? (y/n) ")).trim().toLowerCase();
    if (willInput === 'y') {
        await getUserInput();
    }

    printSortedArray();
};

main();