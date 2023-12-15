// event listeners for the form submission
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchBox = document.getElementById('searchBox');
    const searchTerm = searchBox.value;

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/data?format=json&tags=${searchTerm}`)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});