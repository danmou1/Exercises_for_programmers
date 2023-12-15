// event listeners for the form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value;

    try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});