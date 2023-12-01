const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise ((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

function isNumber(array) {
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') {
            return false;
        }
    }
    return true;
};


function getRandomInt(max) {
    let min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

function getPasswordStructure(length, special, digits) {
    const passwordStructure = {
        letters: length - (special + digits),
        digits: digits,
        special: special
    };

    return passwordStructure
};

async function getArguments() {
    const arguments = [
        Number(await prompt(`What's the length? `)), 
        Number(await prompt(`How many special characters? `)), 
        Number(await prompt ('How many numbers? '))];

    if (isNumber(arguments)) {
        return arguments;
    } else {
        console.log(`Invalid values, they must be numeric.\n`);
        return getArguments();
    }
};

function passwordGenerator(length, special, digits) {
    const CHARS = {
        letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        digits: "0123456789",
        special: "!@#$%&*()"
    };

    const passwordStructure = getPasswordStructure(length, special, digits);

    let password = '';

    //generates an array of arrays contaning [charType, count] from the passwordStructure object
    //charType represents the type, as letters digits and special, count represents how many of those should be included.
    //the array replaces [charType, count] with [charType] count times.
    //then, after only charTypes remain, they are randomized.
    const passwordArray = Object.entries(passwordStructure)
        .flatMap(([charType, count]) => Array(count).fill(charType))
        .map(charType => CHARS[charType].charAt(getRandomInt(CHARS[charType].length)));

    //shuffling array
    passwordArray.sort(() => Math.random() - 0.5);

    password = passwordArray.join('');

    return password;
};

async function main() {
    const args = await getArguments();
    const passwords = [
        passwordGenerator(args[0], args[1], args[2]),
        passwordGenerator(args[0], args[1], args[2]),
        passwordGenerator(args[0], args[1], args[2])
    ];
    console.log(`Here are a few passwords you can use:\n${passwords[0]}\n${passwords[1]}\n${passwords[2]}`);

    rl.close();
};

main();