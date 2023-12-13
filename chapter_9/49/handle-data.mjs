const handleData = async (url) => {
    const data = await fetch(url).then(data => {
        return data.json();
    });
}

export default handleData