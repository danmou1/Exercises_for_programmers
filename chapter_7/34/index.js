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
            return JSON.parse(data);
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

async function main() {
    try {
        let data = await dataHandler.readData();
        let names = (data.map((o, index) => (index === 0 ? '' : '\n') + o.name)).join('');
        
        console.log(`There are ${data.length} employees:\n` + names);

        const removeEmployee = await prompt('Enter an employee name to remove: ');

        data = await dataHandler.removeData(removeEmployee);
        names = (data.map((o, index) => (index === 0 ? '' : '\n') + o.name)).join('');

        console.log(`There are ${data.length} employees:\n` + names);
        rl.close();
    } catch (error) {
        console.error('Error', error);
    }
};

main();