/** TODO
 * 
 * prompt for name of the site
 * prompt for the author of the site
 * ask if the user wants a folder for JS files
 * ask if the user wants a folder for CSS files
 * generate an index.html file that contains the name of the site inside the <title> tag and the author in a <meta> tag.
 * 
 * eu vou demorar 3 dias nessa
 */

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const filePath = __dirname;
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (promptMessage) => new Promise ((resolve) => rl.question(promptMessage, (answer) => resolve(answer.trim())));

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};


async function promptTitle(promptMessage) {
    const validateInput = (input) => /^[A-Za-z0-9\s]+$/.test(input);
    let userInput = '';
    
    while (!validateInput(userInput)) {
        userInput = await prompt(`${promptMessage}`);
        
        if (!validateInput(userInput)) {
            clearLines(3);
            console.log('Invalid input. Please enter only alphanumeric characters.')
        }
    };
    
    return userInput;
};

getUserInput();

async function promptYN(promptMessage) {
    const validateInput = (input) => /^(y|n|yes|no)$/i.test(input);
    let userInput = false;
    
    while (!validateInput(userInput)) {
        userInput = await prompt(`${promptMessage}`);
        
        if (!validateInput(userInput)) {
            clearLines(3);
            console.log('Invalid input. Please enter only yes or no.');
        }
    }
    
    if (/^(y|yes)$/i.test(userInput)) {
        return true;
    }
    if (/^(n|no)$/i.test(userInput)) {
        return false
    }
};

async function getUserInput() {
    const titleName = await promptTitle('Name of the site:\n');
    const formattedName = titleName.toLowerCase().replace(/\s/g, '-');

    const author = await prompt('Author:\n');

    const createJSDir = await promptYN('Do you want a folder for JavaScript?\n[Yes or No]: ');
    const createCSSDir = await promptYN('Do you want a folder for CSS?\n[Yes or No]: ');

    console.log(titleName, formattedName, author, createJSDir, createCSSDir);
    rl.close();
};