import https from 'https';

const makeApiCall = (options) => {
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

        req.end();
    });
};

export default makeApiCall;