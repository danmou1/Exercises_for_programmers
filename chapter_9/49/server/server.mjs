import http from 'http'
import url from 'url';
import makeApiCall from './make-api-call.mjs';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/data' && req.method === 'GET') {
        const searchTerm = parsedUrl.query.searchTerm || 'default';
        const responseData = { message: `Data for ${searchTerm}` };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
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