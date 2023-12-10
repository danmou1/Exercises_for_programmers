import makeApiCall from "./apiCaller.mjs"
import { prompt, close } from "./prompt.mjs";
import './env.mjs'

const limit = 5;

async function fetchData() {
    try {
        const location = await prompt("Where are you:\n");
        const API_Key = process.env.WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${API_Key}`;

        console.log(url);
        const data = await makeApiCall(url);

        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        close();
    }
};

fetchData();