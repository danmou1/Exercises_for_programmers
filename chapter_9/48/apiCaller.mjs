import https from 'https';

const makeApiCall = (url) => {
    const { hostname, pathname } = new URL(url);

    const options = {
        hostname,
        path: pathname,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (err) => {
            reject(`Error making the request: ${err.message}`);
        });

        req.setTimeout(10000, () => {
            req.abort();
            reject('Request timed out');
        });

        req.end();
    });
};


export default makeApiCall;