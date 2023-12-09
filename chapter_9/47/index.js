const http = require('http');

function doHttpRequest(url, requestData = null) {
    return new Promise((resolve, reject) => {
        const { hostname, pathname } = new URL(url);

        const options = {
            method:'GET',
            hostname,
            path: pathname,
            headers: {
                'content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
              data += chunk;
            });

            res.on('end', () => {
              resolve(data);
            });
          });

        req.on('error', (error) => {
            reject(error);
        });

        if(requestData) {
            req.write(requestData);
        }

        req.end();
    });
};

function parseData(data) {
    try {
        const parsedData = JSON.parse(data);

        const people = parsedData.people;
        const sortedNames = people.slice().sort((a,b) => a.name.localeCompare(b.name));

        console.table(sortedNames);
    } catch (error) {
        console.error('Error parsing JSON:', error.message)
    }
};

const apiUrl = 'http://api.open-notify.org/astros.json';

doHttpRequest(apiUrl)
    .then((data) => {
        parseData(data);
    })
    .catch((error) => {
        console.error('Error making API call:', error.message);
    });
