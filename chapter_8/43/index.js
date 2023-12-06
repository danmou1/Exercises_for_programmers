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
    const userInput = {
        titleName: await promptTitle('Name of the site:\n'),
        author: await prompt('Author:\n'),
        createJSDir: await promptYN('Do you want a folder for JavaScript?\n[Yes or No]: '),
        createCSSDir: await promptYN('Do you want a folder for CSS?\n[Yes or No]: '),
    };

    userInput.directoryName = userInput.titleName.toLowerCase().replace(/\s/g, '-');

    rl.close();

    return userInput;
};

async function createDirectory(name) {
    try {
        const directoryPath = path.join(__dirname, name);

        await fs.mkdir(directoryPath, {recursive: false});

        console.log(`Created ${name}`);
    } catch (err) {
        console.error(`Error:`, err);
    }
};

//creates an html file based on a template
async function writeFromTemplate(titleName, author, directoryName) {
    try {
        const templatePath = path.join(__dirname, 'templates/index.html');

        const templateContent = await fs.readFile(templatePath, 'utf8');
        
        //content to write
        const updatedContent = (templateContent
            .replace(`{{title}}`, titleName)
            .replace(`{{author}}`, author)
        );
        
        const fileName = 'index.html'
        const outputFile = path.join(__dirname, directoryName, fileName);

        await fs.writeFile(outputFile, updatedContent, 'utf8');

        console.log(`Created ${path.join(directoryName, fileName)}`);
    } catch (err) {
        console.error('Error:', err);
    }
};

async function main() {
    const d = await getUserInput();

    await createDirectory(d.directoryName);
    await writeFromTemplate(d.titleName, d.author, d.directoryName);

    if (d.createJSDir === true) {
        await createDirectory(`${d.directoryName}\\js\\`);
    }

    if (d.createCSSDir === true) {
        await createDirectory(`${d.directoryName}\\css\\`);
    }
};

main();