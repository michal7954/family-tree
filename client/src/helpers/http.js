const request = async (data) => {
    const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    return json;
};

export default request;