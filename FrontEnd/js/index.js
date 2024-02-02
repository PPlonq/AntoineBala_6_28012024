const gallery = document.querySelector(".gallery")
console.log ("gallery elements:", gallery)

gallery.innerHTML = "Hello, World!";

fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Convertir la réponse en JSON
  })
  .then((works) => {
    console.log(works); 
    // Faites ici ce que vous voulez faire avec les données
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

