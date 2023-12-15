import http from 'http';
import url from 'url';
import { readFile } from 'fs/promises';
import { join } from 'path';
import makeApiCall from './make-api-call.mjs';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (parsedUrl.pathname === '/api/data' && req.method === 'GET') {
        const searchTerm = parsedUrl.query.tags || 'default';

        makeApiCall(searchTerm)
            .then(apiData => {
            const jsonData = JSON.stringify(apiData, null, 2);
            const mediaLinks = jsonData.items.map(item => item.media.m);
            const jsonResponse = JSON.stringify(mediaLinks);

            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(jsonResponse);
            })
            .catch(error => {
                console.error('Error in calling the API', error);
                res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json'})
                res.end(JSON.stringify({ error: 'Internal Server Error'}))
            });
    } else {
        const filePath = join(__dirname, 'public', parsedUrl.pathname);
        readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        })
    }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});