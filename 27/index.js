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
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function getUserInput(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, resolve);
    });
;}

class UserInfo {
    constructor(firstName, lastName, zipCode, employeeID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode;
        this.employeeID = employeeID;
    }

    validateName(name, fieldname) {
        if (/^[A-Za-zÀ-ú]+$/.test(name) && name.length > 2) {
            return;
        } else if (!name) {
            return `The ${fieldname} must be filled in.`;
        } else {
            return `"${name}" is not a valid ${fieldname}. It is too short.`;
        };
    };

    validateZipCode(zipCode) {
        if (!isNaN(zipCode) && zipCode.length === 5) {
            return;
        } else {
            return 'The ZIP Code must be numeric and have a length of 5.';
        };
    };

    validateEmployeeID(employeeID) {
        if (/^[A-Z]{2}-\d{4}$/.test(employeeID)) {
            return;
        } else {
            return `"${employeeID}" is not a valid ID.`;
        };
    };

    validateInput() {
        const errors = [];

        errors.push(this.validateName(this.firstName, 'first name'));
        errors.push(this.validateName(this.lastName, 'last name'));
        errors.push(this.validateZipCode(this.zipCode));
        errors.push(this.validateEmployeeID(this.employeeID));

        return errors.filter((error) => error !== undefined);
    }
}

const main = async() => {
    const firstName = await getUserInput(rl, 'Enter the first name: ');
    const lastName = await getUserInput(rl, 'Enter the last name: ');
    const zipCode = await getUserInput(rl, 'Enter the ZIP code: ');
    const employeeID = await getUserInput(rl, 'Enter the employee ID: ');

    const userInfo = new UserInfo(firstName, lastName, zipCode, employeeID);
    const errors = userInfo.validateInput();

    if (errors.length === 0) {
        rl.close();
    } else {
        errors.forEach((error) => console.log(error));

        //recursion
        console.log('\nErrors were found. Please correct them and try again.\n');
        await main();
    };
};

main();