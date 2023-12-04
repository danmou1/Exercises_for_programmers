//idk what to do
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'data.csv');
const longestResults = {
    lastname: {value: '', length: 0},
    firstname: {value: '', length: 0},
    salary: {value: '', length: 0}
};
const results = [];

const readStream = readline.createInterface({
    input: fs.createReadStream(filePath),
    ctrlfDelay: Infinity
});

readStream.on('line', (line) => {
    const values = line.split(',');
    
    ['lastname', 'firstname', 'salary'].forEach((property, i) => {
        if (values[i] && values[i].length > longestResults[property].length) {
            longestResults[property] = {
                value: values[i],
                length: values[i].length
            };
        }
    });

    results.push(values);
});

readStream.on('close', () => {
    console.log(results);
});
