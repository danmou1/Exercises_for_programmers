const fs = require('fs').promises;
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (promptMessage) => new Promise((resolve) => rl.question(promptMessage, (answer) => resolve(answer.trim())));
const filePath = path.join(__dirname, 'template.txt');

async function readFile() {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log('File content:', content);
        
        return content;
    } catch (err) {
        console.error('Error reading the file:', err);
    }
};

async function writeFromTemplate(fileName) {
    try {
        fileName = fileName.toLowerCase().replace(/\s/g, '-') + '.txt';
        
        const regex = /utilize/ig;
        const templateContent = await readFile();
        
        //content to write
        const updatedContent = templateContent.replace(regex, "use");
        const outputFile = path.join(__dirname, fileName);

        await fs.writeFile(outputFile, updatedContent, 'utf8');

        console.log(`Created ${path.join(fileName)}`);
    } catch (err) {
        console.error('Error:', err);
    }
};
async function main() {
    const fileName = await prompt('Which name do you want for the output file?\n');
    await writeFromTemplate(fileName);

    rl.close();
};

main();