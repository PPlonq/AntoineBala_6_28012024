// Fonction pour effectuer une requête Fetch
// function fetchData(url) {
//   console.log(`Fetching data from: ${url}`);
//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP Error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// }

// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
  const filtersDiv = document.querySelector('.filters');
  console.log("Creating filter buttons...");

  // Créer le bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.id = 'filter-All';
  allButton.className = 'filter-btn';
  filtersDiv.appendChild(allButton);

  // Attacher un gestionnaire d'événements au clic du bouton "Tous"
  allButton.addEventListener('click', () => {
    console.log("Filtering projects by category: All");
    filterProjectsByCategory('All');
  });

  // Créer des boutons pour les autres catégories
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.id = `filter-${category.name}`;
    button.className = 'filter-btn';
    filtersDiv.appendChild(button);

    // Attacher un gestionnaire d'événements à chaque bouton de catégorie
    button.addEventListener('click', () => {
      console.log(`Filtering projects by category: ${category.name}`);
      filterProjectsByCategory(category.name);
    });
  });
}

// Fonction pour afficher les projets
function displayProjects(projects) {
  const galleryDiv = document.querySelector('.gallery');
  galleryDiv.innerHTML = ''; // Effacez le contenu existant
  console.log("Displaying projects...");

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
//   let apiUrl = "http://localhost:5678/api/works";

//   // Si la catégorie n'est pas "Tous", utilise une des catégories de l'URL de l'API
//   if (category !== 'All') {
//     apiUrl += `?category=${category}`;
//   }

//   console.log(`Fetching and filtering projects from: ${apiUrl}`);
//   fetchData(apiUrl)
//     .then((filteredProjects) => {
//       displayProjects(filteredProjects);
//     });
}

// Lancer la séquence de requêtes
// fetchData("http://localhost:5678/api/categories")
//   .then((categories) => {
//     console.log("Fetched categories:", categories);
//     // Créer les boutons de filtre et afficher tous les projets initialement
//     createFilterButtons(categories);
//     return fetchData("http://localhost:5678/api/works");
//   })
//   .then((projects) => {
//     console.log("Fetched projects:", projects, categories);
//     displayProjects(projects);
//   });

  async function init(){
    const categories = await fetchData("http://localhost:5678/api/categories");
    const works = await fetchData("http://localhost:5678/api/works");
    console.log(categories, works)
    displayProjects(works)
    createFilterButtons(categories)
  }
  async function fetchData(url) {
    try {
      console.log(`Fetching data from: ${url}`);
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

init()