import handleData from "../handle-data.mjs";


// event listeners for the form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchBox = document.getElementById('searchBox');
    const searchTerm = searchBox.value;

    try {
        const response = await fetch(`/api/data?format=json&tags=${searchTerm}`)
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});