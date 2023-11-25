/**TODO:
 *
 * prompts for:
 *  - first name
 *  - last name
 *  - zip code
 *  - employee ID
 *
 * rules:
 *  - first and last names must be at least 2 chars long
 *  - zip code must be a number
 *  - employee ID has to follow this format: AA-1234
 *
 * output:
Enter the first name: J
Enter the last name:
Enter the ZIP code: ABCDE
Enter an employee ID: A12-1234
"J" is not a valid first name. It is too short.
The last name must be filled in.
The ZIP code must be numeric.
A12-1234 is not a valid ID.
 */
const readline = require('readline');
let rl;

function initializeReadline() {
    rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });
};

function getUserInput(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, resolve);
    });
;}

function validateInput(firstName, lastName, zipCode, employeeID) {
    let results = [];

    if(/^[A-Za-zÀ-ú]+$/.test(firstName) && firstName.length > 2) {
        results.push(0);
    } else if (firstName.length <= 2) {
        results.push(1);
    } else if (!firstName) {
        results.push(2);
    } else {
        results.push(3);
    };

    if(/^[A-Za-zÀ-ú]+$/.test(lastName) && lastName.length > 2) {
        results.push(0);
    } else if (lastName.length <= 2) {
        results.push(1);
    } else if (!lastName) {
        results.push(2)
    } else {
        results.push(3);
    };

    if(!isNaN(zipCode) && zipCode.length === 5) {
        results.push(0);
    } else if (zipCode.length !== 5) {
        results.push(1);
    } else {
        results.push(2)
    };

    if(/^[A-Z]{2}-\d{4}$/.test(employeeID)) {
        results.push(0);
    } else {
        results.push(1)
    };

    return results;
};

function handleText(results, userInput) {

    //error messages
    switch (results[0]) {
        case 1:
            console.log(`"${userInput[0]}" is not a valid first name. It is too short.`);
            break;
        case 2:
            console.log(`The first name must be filled in.`);
            break;
        case 3:
            console.log(`"${userInput[0]}" is not a valid first name. It contains characters that aren't supported.`);
        };
    switch (results[1]) {
        case 1:
            console.log(`"${userInput[1]}" is not a valid last name. It is too short.`);
            break;
        case 2:
            console.log(`The last name must be filled in.`);
            break;
        case 3:
            console.log(`"${userInput[1]}" is not a valid last name, it contains character that aren't supported.`);
            break;
    };
    switch (results[2]) {
        case 1:
            console.log(`"${userInput[2]}" is not a valid ZIP code. It must be five characters long.`);
            break;
        case 2:
            console.log(`"${userInput[2]}" is not a valid ZIP code. It must be a number.`);
            break;
    };
    switch (results[3]) {
        case 1:
            console.log(`"${userInput[3]}" is an invalid employee ID.`);
            break;
    };

    if (results.every(value => value === 0) && results.length > 0) {
        console.log('There were no errors found.');
        rl.close();
    } else {
        console.log('There were errors found, please try again.');
        rl.close();
        main();
    };
};

async function main() {
    initializeReadline();

    const userInput = [
        await getUserInput(rl, 'Insert the first name: '),
        await getUserInput(rl, 'Insert the last name: '),
        await getUserInput(rl, 'Insert the ZIP code: '),
        await getUserInput(rl, 'Insert the employee ID: '),
    ];

    const results = validateInput(userInput[0], userInput[1], userInput[2], userInput[3]);

    handleText(results, userInput);
};

main();