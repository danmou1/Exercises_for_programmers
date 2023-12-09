//I should separate this into minor functions, but it's concise enough for me to not care.
const fs = require('fs').promises;
const path = require('path')

const filePath = path.join(__dirname, 'words.txt');

async function parseWords() {
    try {
        const content = await fs.readFile(filePath, 'utf8');

        const words = content.split(/\s+/);

        //counts the occurence of each string, by using an
        const wordCount = {};
        words.forEach(word => {
            const parsedWord = word.toLowerCase();
            if(parsedWord !== '') {
                wordCount[parsedWord] = (wordCount[parsedWord] || 0) + 1;
            }
        });

        //sorts the keys and values
        const keyValueArray = Object.entries(wordCount);
        keyValueArray.sort((a, b) => b[1] - a[1]);

        //separates keys and values into separate arrays
        const sortedKeys = keyValueArray.map(entry => entry[0]);
        const sortedValues = keyValueArray.map(entry => entry[1]);

        //prints each key and value;
        sortedKeys.forEach((key, i) => {
            console.log(`${key}: ${'*'.repeat(sortedValues[i])}`);
        });

    } catch (err) {
        console.error('Error:', err);
    }
}

parseWords();