let categories;
let works;

// Fonction init qui lance toute l'application
async function init() {
    categories = await fetchData("/api/categories");
    works = await fetchData("/api/works");
    console.log(categories, works);
    displayProjects(works);
    createCategoriesOptions(categories);
    createFilterButtons(categories);
    displayWorksInModal(works);
    admin();
}

init();

const categorieSelect = document.getElementById("CategorieSelect");
function createCategoriesOptions(categories) {
    categories.forEach((category) => categorieSelect.add(new Option(category.name, category.id)));
}

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
        button.addEventListener("click", (event) => {
            event.preventDefault();
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

    trashIcon.addEventListener("click", async () => {
        console.log("Deleting work...");
        await deleteWork(work.id);
    });

    const img = document.createElement("img");
    img.src = work.imageUrl;

    imageContainer.appendChild(trashIcon);
    imageContainer.appendChild(img);

    workElement.appendChild(imageContainer);

    return workElement;
}

const addPicturebtn = document.getElementById("addPicturebtn");
const addWorkModal = document.getElementById("WorkModal");
addPicturebtn.addEventListener("click", function () {
    addWorkModal.style.display = "flex";
});

const closeBtn = addWorkModal.querySelector(".cross");
closeBtn.addEventListener("click", function () {
    addWorkModal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == WorkModal) {
        addWorkModal.style.display = "none";
    }
});

const picture = document.getElementById("AddPicture");
const pictureIcon = document.getElementById("PictureIcon");
function validateImage(pic) {
    const valid_types = ["image/jpg", "image/png", "image/jpeg"];
    const valid_size = 4 * 1024 * 1024;

    if (valid_types.includes(pic.type) && pic.size <= valid_size) {
        return true;
    }
    return false;
}
picture.addEventListener("change", (event) => {
    event.preventDefault();
    if (picture.files && picture.files[0]) {
        if (validateImage(picture.files[0])) {
            let reader = new FileReader();
            reader.onload = function (e) {
                pictureIcon.src = e.target.result;
            };
            reader.readAsDataURL(picture.files[0]);
        } else {
            pictureIcon.src = "./assets/icons/picture.png";
            picture.value = "";
            alert("Please enter jpg/png and of size less than or equal to 4Mb");
        }
    }
});
const form = document.getElementById("addWorkForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const workTitle = document.getElementById("workTitleInput").value;
    const categorie = document.getElementById("CategorieSelect").value;
    const files = picture.files;
    let output = {
        work: workTitle,
        category: categorie,
    };
    if (files.length > 0) {
        const file = files[0]; // Suppose que vous traitez uniquement le premier fichier sélectionné
        output["file"] = {
            Nom_du_fichier: file.name,
            Type_du_fichier: file.type,
            Taille_du_fichier_en_bytes: file.size,
        };
        const formData = new FormData();
        formData.append("title", workTitle);
        formData.append("category", categorie);
        formData.append("image", file);
        console.log(formData);
        addWork(formData);
    }
    console.log(output);
});
