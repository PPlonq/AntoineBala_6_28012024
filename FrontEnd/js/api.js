// Fonction pour effectuer une requête Fetch
async function fetchData(url) {
    try {
        console.log(`Fetching data from: ${API_HOST + url}`);
        const response = await fetch(API_HOST + url);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function deleteWork(workId) {
    try {
        console.log(`Deleting work from workId ${workId}`);
        const response = await fetch(API_HOST + "/api/works/" + workId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Erreur de Fetch :", error);
    }
}

async function addWork(data) {
    try {
        console.log(`adding work`);
        const options = {
            method: "POST", // specify the HTTP method
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // specify the content type
            },
            body: data,
        };
        console.log(options);
        const response = await fetch(API_HOST + "/api/works/", options);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Erreur de Fetch :", error);
    }
}
