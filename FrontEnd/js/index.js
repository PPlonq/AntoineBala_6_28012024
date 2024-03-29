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
async function init() {
    categories = await fetchData("http://localhost:5678/api/categories");
    works = await fetchData("http://localhost:5678/api/works");
    console.log(categories, works);
    displayProjects(works);
    createFilterButtons(categories);
    admin();
}

init();

// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
    const filtersDiv = document.querySelector(".filters");
    console.log("Creating filter buttons...");

    // Créer le bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.className = "filter-btn filter_selected";
    allButton.dataset.id = "All";
    filtersDiv.appendChild(allButton);

    // Attacher un gestionnaire d'événements au clic du bouton "Tous"
    allButton.addEventListener("click", () => {
        filterProjectsByCategory("All");
    });

    // Créer des boutons pour les autres catégories
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.className = "filter-btn";
        button.dataset.id = category.id;
        filtersDiv.appendChild(button);

        // Attacher un gestionnaire d'événements à chaque bouton de catégorie
        button.addEventListener("click", () => {
            filterProjectsByCategory(category.id);
        });
    });
}

// Fonction pour afficher les projets
function displayProjects(projects) {
    const galleryDiv = document.querySelector(".gallery");
    galleryDiv.innerHTML = ""; // Effacez le contenu existant
    console.log("Displaying projects...");

    projects.forEach((project) => {
        const figure = createProjectFigure(project);
        galleryDiv.appendChild(figure);
    });
}

// Fonction pour créer un élément figure pour un projet
function createProjectFigure(project) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.alt = project.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = project.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}

// Fonction pour filtrer les projets par catégorie
function filterProjectsByCategory(categoryId) {
    console.log(`Filtering projects by category ID: ${categoryId}`);

    // Filtrer les projets en fonction de la catégorie
    const filteredProjects = categoryId === "All" ? works : works.filter((project) => project.categoryId === categoryId);

    // Mettre à jour l'affichage des projets
    displayProjects(filteredProjects);

    activeBtn(categoryId);
}

// Fonction pour mettre à jour les boutons au clic
function activeBtn(categoryId) {
    const btns = document.querySelectorAll(".filter-btn");
    console.log(btns, categoryId);

    btns.forEach((button) => {
        const buttonCategoryId = button.textContent === "Tous" ? "All" : button.dataset.id;
        console.log(button.dataset.id, buttonCategoryId == categoryId);

        if (buttonCategoryId == categoryId) {
            button.classList.add("filter_selected");
        } else {
            button.classList.remove("filter_selected");
        }
    });
}

// Gestion du localStorage
// Gestion du localStorage
function admin() {
    let token = localStorage.getItem("token");
    const loginLogoutBtn = document.querySelector(".menuLogin");
    const modifyProjects = document.getElementById("modify-works"); // Reference to the "Modifier" clickable text
    console.log(token);
    console.log(loginLogoutBtn);

    if (token) {
        // Cacher les boutons si le token est présent
        const filterButtons = document.querySelectorAll(".filter-btn");
        filterButtons.forEach((button) => {
            button.style.display = "none";
        });

        // Ajoute une barre
        const topBar = document.createElement("div");
        topBar.innerHTML = '<p><img src="./assets/icons/vector.png" alt="Mode Edition"/>Mode édition</p>';
        topBar.id = "top-bar";
        document.body.insertBefore(topBar, document.body.firstChild);

        // Si le token existe, change "Login" en "Logout"
        loginLogoutBtn.textContent = "Logout";
        // Event listener pour se déconnecter
        loginLogoutBtn.addEventListener("click", function () {
            // Enlève le token du localStorage (deconnexion)
            localStorage.removeItem("token");
            // si besoin de redirection
            // window.location.href = "./index.html";
        });
        // Ajouter un écouteur d'événements pour le texte "Modifier"
        const modifyProjects = document.getElementById("modify-works");
        modifyProjects.addEventListener("click", function () {
            // Afficher la modale
            const modal = document.querySelector(".modal");
            modal.style.display = "block";

            // Afficher l'overlay pour flouter l'arrière-plan
            const overlay = document.querySelector(".overlay");
            overlay.style.display = "block";

            // Ajouter un écouteur d'événements pour fermer la modale et l'overlay lorsqu'on clique à l'extérieur de la modale
            overlay.addEventListener("click", function (event) {
                if (event.target === overlay) {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                }
            });
        });
    }
}
