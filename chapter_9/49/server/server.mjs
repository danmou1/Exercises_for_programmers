import http from "node:http";
import querystring from "node:querystring"
import { callExternalAPI } from "./api-caller.mjs";


const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const parsedUrl = new URL (`http://localhost${req.url}`);

    if(parsedUrl.pathname === "/search") {
        const queryParams = querystring.parse(parsedUrl.search.slice(1));
        const query = queryParams.q;
        const mediaLinks = await getMediaLinks(query);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(mediaLinks));
    } else {
        switch (req.url) {
            case "/":
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Home page");
                break;

            case "/api/data":
                try {
                    const mediaLinks = await getMediaLinks('nature');
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(mediaLinks));
                    break;
                } catch (error) {
                    console.error('Error fetching data media lnks:', error);
                    res.writeHead(500);
                    res.end('Internal Server Error');
                }
                break;

            case "/about":
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("About page");
                break;

            default:
                res.writeHead(404)
                res.end("Page not found");
        };
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function getMediaLinks(query) {
    try {
        const jsonData = await callExternalAPI(query);
        const mediaLinks = jsonData.items.map(item => item.media.m);
        return mediaLinks;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        return [];
    }
};