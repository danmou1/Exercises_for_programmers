import http from 'http';


const makeApiCall = (searchTerm) => {
    const apiUrl = `http://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${encodeURIComponent(searchTerm)}`
    
    console.log(`Calling: ${apiUrl}`);
    return new Promise((resolve, reject) => {
        const req = http.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                console.log('API Response:', data)
                resolve(data);
            })
        });
        
        req.on('error', (error) => reject(error));
        req.end();
    });
};

export default makeApiCall;