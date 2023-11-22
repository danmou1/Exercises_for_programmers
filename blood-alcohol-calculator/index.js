/** TODO
 * prompt weight, gender, number of drinks, alcohol volume of drinks, time since last drink
 * 
 * calculate BAC using this formula:
 *  BAC = (A * 5.14 / W * r) - 0.015 * H
 *  A = alcohol consumed in ounces
 *  W = body weight in pounds
 *  r = alcohol dritibution ratio
 *  H = number of hours since last drink 
 */

const legalBAC = 0.08;

function askQuestion(rl, prompt) {
    return new Promise((resolve) => rl.question(prompt, resolve));
};

async function calcBAC() {
    const weight = await askQuestion(rl, 'How much do you weight in pounds? ');
    const gender = await askQuestion(rl, 'What is your gender? ');
    const numDrinks = await askQuestion(rl, 'How many drinks did you have today? ');
    const alcVolume = await askQuestion(rl, 'What was the alcohol volume of the drinks you consumed? ');
    const time = await askQuestion(rl, 'How much time has passed after your last drink? ');
}