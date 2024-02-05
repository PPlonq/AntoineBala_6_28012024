// Fonction pour effectuer une requête Fetch
function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur de récupération :", error);
    });
}

// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
  const filtersDiv = document.querySelector('.filters');

  // Créer le bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.id = 'filter-All';
  filtersDiv.appendChild(allButton);

  // Attacher un gestionnaire d'événements au clic du bouton "Tous"
  allButton.addEventListener('click', () => filterProjectsByCategory('All'));

  // Créer des boutons pour les autres catégories
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.id = `filter-${category.name}`;
    filtersDiv.appendChild(button);

    // Attacher un gestionnaire d'événements à chaque bouton de catégorie
    button.addEventListener('click', () => filterProjectsByCategory(category.name));
  });
}

// Fonction pour afficher les projets
function displayProjects(projects) {
  const galleryDiv = document.querySelector('.gallery');
  galleryDiv.innerHTML = ''; // Effacez le contenu existant

  projects.forEach((project) => {
    const figure = createProjectFigure(project);
    galleryDiv.appendChild(figure);
  });
}

// Fonction pour créer un élément figure pour un projet
function createProjectFigure(project) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = project.imageUrl;
  img.alt = project.title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = project.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

// Fonction pour filtrer les projets par catégorie
function filterProjectsByCategory(category) {
  let apiUrl = "http://localhost:5678/api/works";

  // Si la catégorie n'est pas "Tous", ajouter le paramètre de catégorie à l'URL de l'API
  if (category !== 'All') {
    apiUrl += `?category=${category}`;
  }

  fetchData(apiUrl)
    .then((filteredProjects) => {
      displayProjects(filteredProjects);
    });
}

// Lancer la séquence de requêtes
fetchData("http://localhost:5678/api/categories")
  .then((categories) => {
    // Créer les boutons de filtre et afficher tous les projets initialement
    createFilterButtons(categories);
    return fetchData("http://localhost:5678/api/works");
  })
  .then((projects) => {
    displayProjects(projects);
  });
