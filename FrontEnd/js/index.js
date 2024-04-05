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
    displayWorksInModal(works);
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

let token = localStorage.getItem("token");

async function deleteWork(workId) {
    try {
        console.log(deleteWork);
        const response = await fetch("http://localhost:5678/api/works/" + workId, {
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

function displayWorksInModal(works) {
    const worksContainer = document.getElementById("works-container");
    worksContainer.innerHTML = "";

    works.forEach((work) => {
        const workElement = createWorkElement(work);
        worksContainer.appendChild(workElement);
    });
}

function createWorkElement(work) {
    const workElement = document.createElement("div");
    workElement.classList.add("work");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const trashIcon = document.createElement("img");
    trashIcon.src = "./assets/icons/trash.png";
    trashIcon.alt = "Delete";
    trashIcon.classList.add("trash-icon");

    trashIcon.addEventListener("click", () => {
        console.log("Deleting work...");
        const deletedWork = deleteWork(work.id);
    });

    const img = document.createElement("img");
    img.src = work.imageUrl;

    imageContainer.appendChild(trashIcon);
    imageContainer.appendChild(img);

    workElement.appendChild(imageContainer);

    return workElement;
}

const addPicturebtn = document.getElementById("addPicturebtn");
const addWorkModal = document.getElementById("addWorkModal");
addPicturebtn.addEventListener("click", function () {
    addWorkModal.style.display = "block";
});

// Close the modal when the user clicks on the close button
const closeBtn = addWorkModal.querySelector(".close");
closeBtn.addEventListener("click", function () {
    addWorkModal.style.display = "none";
});

// Close the modal when the user clicks outside the modal
window.addEventListener("click", function (event) {
    if (event.target == addWorkModal) {
        addWorkModal.style.display = "none";
    }
});

// Prevent modal closure when the user clicks inside the form
const form = document.getElementById("addWorkForm");
form.addEventListener("click", function (event) {
    event.stopPropagation();
});
