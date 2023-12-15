import https from "node:https";
import { extractFlickrJSON } from "./utils/jsonExtractor.mjs";


function callExternalAPI(query) {
    return new Promise((resolve, reject) => {
        const url = new URL(`https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${query}`);

        const req = https.request(url, (res) => {
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = extractFlickrJSON(rawData);
                    resolve(jsonData)
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    })
}

export { callExternalAPI };