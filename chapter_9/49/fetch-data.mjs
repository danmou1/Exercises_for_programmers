import https from "https";


const fetchData = (tags) => {
    const encodedTags = encodeURIComponent(tags);

    const { hostname, pathname, search } = new URL(`https://www.flickr.com/services/feeds/photos_public.gne?tags=${encodedTags}`);

    const options = {
        hostname,
        path: `${pathname}${search}`,
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(`Request failed with status code ${res.statusCode}`);
                }
            });
        });

        req.on('error', (err) => {
            reject(`Error making the request: ${err.message}`);
        });

        req.setTimeout(10000, () => {
            req.destroy();
            reject('Request timed out');
        });

        req.end();
    });
};


export default fetchData;