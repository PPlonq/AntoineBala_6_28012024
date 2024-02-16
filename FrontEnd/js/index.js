// Fonction pour effectuer une requête Fetch
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

let categories;
let works;

// Fonction init qui lance toute l'application
async function init(){
  categories = await fetchData("http://localhost:5678/api/categories");
  works = await fetchData("http://localhost:5678/api/works");
  console.log(categories, works);
  displayProjects(works);
  createFilterButtons(categories);
}

init();

// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
  const filtersDiv = document.querySelector('.filters');
  console.log("Creating filter buttons...");

  // Créer le bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.className = 'filter-btn';
  filtersDiv.appendChild(allButton);

  // Attacher un gestionnaire d'événements au clic du bouton "Tous"
  allButton.addEventListener('click', () => {
    filterProjectsByCategory('All');
  });

  // Créer des boutons pour les autres catégories
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.className = 'filter-btn';
    filtersDiv.appendChild(button);

    // Attacher un gestionnaire d'événements à chaque bouton de catégorie
    button.addEventListener('click', () => {
      filterProjectsByCategory(category.id);
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
function filterProjectsByCategory(categoryId) {
  console.log(`Filtering projects by category ID: ${categoryId}`);
  
  // Filtrer les projets en fonction de la catégorie
  const filteredProjects = (categoryId === 'All') ? works : works.filter(project => project.categoryId === categoryId);

  // Mettre à jour l'affichage des projets
  displayProjects(filteredProjects);

  activeBtn();
}

    //fonction pour mettre à jour les boutons au clic
function activeBtn() {
  const btns = document.querySelectorAll(".filters");
  console.log(btns)
  // button.forEach((button, index) => { 
  // if (index === categoryId) {
  //   dot.classList.add("filter_selected");
  // } else {
  //   dot.classList.remove("filter_selected");
  // }
  // });
}


