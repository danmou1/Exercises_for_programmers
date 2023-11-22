/** TODO
 * for wisconsin residents, prompt for county, Eau Claire county has an additional 0.005 tax, Dunn county 0.004 tax
 * illinois residents are charged 0.08 sales tax, no additional county tax
 * other states are exempt
 *  
 * prompt order amoutn
 * prompt state
 * print tax
 * print total
 */

function askQuestion(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkValue(answer, resolve));
    })
};

function checkValue(answer,resolve) {
    const unit = parseFloat(answer)
    if (isNaN(unit) || unit <= 0){
        console.log('Invaild value, please enter a number greater than 0');
        askQuestion(rl, 'Try again: ').then(resolve);
    } else {
        resolve(unit);
    }
};

function getState(rl, prompt) {
    return new Promise ((resolve) => {
        rl.question(prompt, (answer) => checkState(answer, resolve));
    })
};

function checkState(answer, resolve) {
    
}