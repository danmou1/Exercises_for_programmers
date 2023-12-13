import http from 'http';


const makeApiCall = (searchTerm) => {
    const apiUrl = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${encodeURIComponent(searchTerm)}`

    return new Promise((resolve, reject) => {
        http.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                try {
                    const apiData = JSON.parse(data);
                    resolve(apiData);
                } catch(error) {
                    reject(error);
                }
            });
        }).on('error', (error) => reject(error))
    });
};

export default makeApiCall;