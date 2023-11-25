/**TODO:
 * 
 * prompt for pass
 * 
 * checks strength of the pass based on these conditions:
 *  - exclusive number pass with 7 or less digits is very weak
 *  - exclusive letter pass with 7 or less digits is weak
 *  - strong pass are a mix of numbers and letters, and contain at least 8 chars
 *  - very strong pass contains special chars, letters and numbers, and at least 8 chars
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


function promptPass(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => passwordValidator(answer, resolve));
    })
};

function passwordValidator(answer, resolve) {

    if (!answer) {
        resolve('error');
    } else if (!isNaN(answer) && answer.length <= 7) {
        resolve(0);
    //checks if it contains only letters and length is fewer than 8
    } else if (/^[a-zA-Z/]+$/.test(answer) && answer.length <= 7) {
        resolve(1);
    //checks if it contains letters and digits specifically, and length is greater than or equal to 8
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(answer) && answer.length >= 8){
        resolve(2);
    //checks if it contains letters, digits and symbols, and legth is greater than or equal to 8
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/.test(answer) && answer.length >= 8) {
        resolve(3);
    } else {
        resolve(4);
    }
};

async function main() {
    const passStrength = await promptPass(rl, 'Insert your password: ');

    switch (passStrength){
        case 0:
            console.log('Your password is very weak.');
            break
        case 1:
            console.log('Your password is weak.');
            break
        case 2:
            console.log('Your password is strong.');
            break
        case 3:
            console.log('Your password is very strong.');
            break
        case 4:
            console.log('Your password is average.')
            break
        default:
            console.log('Error.');
    }

    rl.close();
};

main();