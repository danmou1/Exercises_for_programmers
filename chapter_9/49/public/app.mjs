// event listeners for the form submission

const fetchData = async (query) => {
    try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error>:', error.message);
        return [];
    }
};

const createImageElement = (imageLink) => {
    const imgElement = document.createElement('img');
    imgElement.src = imageLink;
    imgElement.alt = "Image";
    return imgElement
};

const addImagesToContainer = (data, resultsContainer) => {
    data.forEach((imageLink) => {
        const imgElement = createImageElement(imageLink);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-item');
        imageContainer.appendChild(imgElement);

        resultsContainer.appendChild(imageContainer);
    });
};

const displayImages = async () => {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value;

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    const textContainer = document.createElement('div');
    
    const textElement = document.createElement('p');
    textElement.textContent = `Images about "${query}":`;
    textElement.classList.add('text-element');
    textContainer.appendChild(textElement);
    
    const lineBreak = document.createElement('br');
    textContainer.appendChild(lineBreak);
    
    const searchButton = document.querySelector('#searchForm button');
    searchButton.parentNode.insertBefore(textContainer, searchButton.nextSibling);
    
    const data = await fetchData(query);
    addImagesToContainer(data, resultsContainer);
};

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await displayImages();
});