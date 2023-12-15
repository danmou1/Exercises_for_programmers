function extractFlickrJSON(rawData) {
    const matches = rawData.match(/jsonFlickrFeed\((.*)\)/s);
    if (matches && matches[1]) {
    return JSON.parse(matches[1]);
    } else {
        throw new Error('Json content not found or invalid in the response');
    }
}

export { extractFlickrJSON };