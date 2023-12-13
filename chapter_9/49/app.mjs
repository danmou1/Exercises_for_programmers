import handleData from "./handle-data.mjs";


// event listeners for the form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchBox = document.getElementById('searchBox');
    const searchTerm = searchBox.value;

    try {
        const url = `http://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${searchTerm}`;
        const data = await fetch(url, { mode: 'cors'})
            .then(d => d.json());

        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});