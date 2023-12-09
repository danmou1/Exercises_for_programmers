import makeApiCall from "./apiCaller.mjs";
import readline from "readline";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const prompt = (promptMessage) => new Promise((resolve) => rl.question(promptMessage, (answer) => resolve(answer.trim())));

const limit = 5
const location = await prompt("Where are you:\n");

const { hostname, pathname} = new URL (`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${keyAPI}`)

const apiOptions = {
    hostname,
    path: pathname,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

makeApiCall(apiOptions)
    .then((data) => {
        rl.close();
        console.log(data);
    })
    .catch((error) => {
        rl.close();
        console.error(error);
    });