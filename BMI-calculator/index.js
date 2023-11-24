/** TODO
 *  promp user for weight and height
 * 
 * bmi = W/(H**2)*703
 */
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function askQuestion(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    })
};

function checkValue(answer, resolve) {
    const number = parseFloat(answer)
    if (isNaN(number) || number <= 0){
        console.log('Invalidd value, please enter a number greater than 0');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(number);
    }
};

async function calcBMI() {
    const height = await askQuestion(rl, 'Please enter your height in inches: ');
    const weight = await askQuestion(rl, 'Please enter your weight in pounds: ');

    const BMI = weight / (height ** 2) * 703;
    
    console.log(`Your BMI is ${BMI}.`);
    if(BMI > 18.5 && BMI < 25) {
        console.log('Your weight is withing the ideal range.')
    } else if (BMI >= 25) {
        console.log('You are overweight. Seek medical attention.');
    } else {
        console.log('You are underweight. Seek medical attention.')
    }

    rl.close();
}

calcBMI();