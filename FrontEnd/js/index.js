fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((works) => {
    const galleryDiv = document.querySelector('.gallery');

    works.forEach((project) => {
      // Créez un élément figure pour chaque projet
      const figure = document.createElement('figure');

      // Créez un élément img pour l'image du projet
      const img = document.createElement('img');
      img.src = project.imageUrl; 
      img.alt = project.title;

      // Créez un élément figcaption pour le titre du projet
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = project.title;

      // Ajoutez l'image et le titre à la figure
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Ajoutez la figure à la galerie
      galleryDiv.appendChild(figure);
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
