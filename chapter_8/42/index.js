//questão desgraçada, seria muito mais fácil usar console.table
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'data.csv');
const longestResults = {};
const results = [];

const readStream = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
});

let properties;

readStream.on('line', (line) => {
    const values = line.split(',');
    
    if (!properties) {
        properties = values;
        properties.forEach(property => {
            longestResults[property] = {value: '', length: 0};
        });
        
        return;
    }

    properties.forEach((property, i) => {
        if (values[i] && values[i].length > longestResults[property].length) {
            longestResults[property] = {
                value: values[i],
                length: values[i].length
            };
        }
    });

    results.push(values);
});

function formatTable(data, properties, longestResults) {
    const headers = ['Last', 'First', 'Salary'];

    //print headers, this works and I don't know how
    console.log(headers.map((header, i) => {
        const count = Math.max(0, longestResults[properties[i]].length - header.length);
        return `${header}${' '.repeat(count)}`
    }).join(' '));

    //print separator line
    console.log('-'.repeat(properties.reduce((total, prop) => total + longestResults[prop].length + 2, 0)));

    //print data
    data.forEach((row) => {
        const formattedData = row.map((value, i) => {
            const spaces = ' '.repeat(longestResults[properties[i]].length - value.length);
            return `${value}${spaces}`;
        });
        console.log(formattedData.join(' '));
    });
};

readStream.on('close', () => {
    formatTable(results, properties, longestResults);
});