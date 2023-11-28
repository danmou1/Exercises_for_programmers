const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (promptMsg) => new Promise ((resolve) => {
    rl.question(promptMsg, (answer) => validateInput(answer, promptMsg, resolve));
});

const validateInput = (answer, promptMsg, resolve) => {
    let number = parseFloat(answer);

    let errorMsg = errorHandling(answer, number);

    if (errorMsg) {
        clearLines(1);
        console.log(errorMsg);
        prompt(promptMsg).then(resolve);
    } else {
        resolve(number);
    }
};

const errorHandling = (answer, number) => {
    if (isNaN(number) || answer.trim() === '') {
        return "Invalid input, it must be numeric.";
    }

    if (number === 0) {
        return "Invalid input, it cannot be zero.";
    }

    return null;
};

const clearLines = (lines) => {
    rl.output.write('\x1B[1A\x1B[2K'.repeat(lines));
};

//this look really ugly
const main = async () => {
    const age = await prompt('Insert your age: ');
    const restingHeartRate = await prompt('Insert your resting heart rate: ');
    let intensity = 55;
    
    //head of the graph
    console.log(
        `Intensity   |    Rate\n` +
        `------------|-----------------` 
    );

    //body of the graph
    do {
        let TargetHeartRate = Math.round((((220 - age) - restingHeartRate) * (intensity/100)) + restingHeartRate);
        console.log(`${intensity}%         |   ${TargetHeartRate} bpm`);
        
        intensity += 5;
    } while (intensity <=95);

    rl.close();
}

main();