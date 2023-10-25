//inputs a string and then counts the characters of said string

const prompt = require("prompt-sync")()

let userInput = prompt('Insert the input string: ')
while (userInput === null || userInput.length === 0){
    userInput = prompt('Invalid string, please enter a proper string: ')
}

console.log(`${userInput} has ${userInput.length} characters.`);
/*following is interchangeable code, in case the snippet above looks off

let output = `${userInput} has ${userInput.lenght} characters.`
console.log(output);
*/
