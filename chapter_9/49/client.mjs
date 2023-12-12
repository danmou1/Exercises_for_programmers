// event listeners for the form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchBox = document.getElementById('searchBox');
    const searchTerm = await searchBox.value;

    try {
        const response = await fetch(`/fetch-data?tags=${searchTerm}`);
        const data = response;

        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});