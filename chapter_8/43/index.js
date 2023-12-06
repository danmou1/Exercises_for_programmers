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

const prompt = (message) => new Promise ((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

async function getUserInput() {
    let titleName;
    let formattedName;

    while (true) {
        titleName = await prompt('Site name:\n');
        formattedName = titleName.toLowerCase().replace(' ', '-');
        
        if (/^[A-Za-z0-9 ]+$/.test(titleName)) {
            break;
        } else {
            console.log('Invalid input. Please only use alphanumeric characters.')
        }
    }

    let author = await prompt('Author:\n');

    //this works, but I don't like how it looks
    //yes or no validation, regex seems like the best choice for these scenarios
    //I can make constants nested in the if statements, but this seems slightly more understandable, though it also seems unsafe
    let createJSFolder;
    let createCSSFolder;

    while (true) {
        createJSFolder = await prompt('Do you want a folder for Javascript?\n[Yes or No]: ');
        
        if (/^(y|n|yes|no)$/i.test(createJSFolder.toLowerCase())) {
            createCSSFolder = await prompt('Do you want a folder for CSS?\n[Yes or No]: ');

            if (/^(y|n|yes|no)$/i.test(createCSSFolder)) {
                break;
            };

            console.log('Invalid input. Please answer either yes or no.');
        };
        console.log('Invalid input. Please answer either yes or no.');
    };

    rl.close();
};

getUserInput();