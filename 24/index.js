/**TODO
 * 
 * prompt for two strings and check if they're anagrams
 * 
 * do this using for loops
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function promptString(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkString(answer, resolve));
    })
};

function checkString(answer, resolve) {
    if (typeof answer === 'string' && /^\p{L}+$/u.test(answer)){
        resolve(answer);
    } else {
        console.log('Invalid value, please enter a word.');
        promptString(rl, 'Try again: ').then(resolve);
    }
};

function isAnagram(string1, string2) {
    let sort1 = string1.split('').sort().join('');
    let sort2 = string2.split('').sort().join('');

    return sort1 === sort2
}

async function main() {
    console.log(`Enter two strings and I'll tell you if they're anagrams: `)
    const prompts = [
        await promptString(rl, 'Enter the first string: '),
        await promptString(rl, 'Enter the second string: ')
    ];

    if (prompts[0] === prompts[1]) {
        console.log('The given strings are identical.');
        rl.close();
        return
    } else if (prompts[0].length != prompts[1].length) {
        console.log('The given strings do not have the same length.');
        rl.close();
        return
    } else {
        const result = isAnagram(prompts[0], prompts[1]);
        if (result === true) {
            console.log(`"${prompts[0]}" and "${prompts[1]}" are anagrams.`);
        } else {
            console.log(`"${prompts[0]}" and "${prompts[1]}" are not anagrams.`);
        }
    }
    
    rl.close();
}

main();