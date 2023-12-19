import makeApiCall from "./make-api-call.mjs"
import { prompt, close } from "./prompt.mjs";
import './env.mjs'

const cityName = await prompt("Where are you? ");
const API_Key = process.env.WEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=imperial`;

close();

const data = JSON.parse(await makeApiCall(url));

console.log(
    `${data.name} weather:\n` +
    `${data.main.temp} degrees Fahrenheit.`
);