const modifyProjects = document.getElementById("modify-works");
const cross = document.getElementById("cross");
const modal = document.querySelector(".containerModal");

// Gestion du localStorage
function admin() {
    let token = localStorage.getItem("token");
    const loginLogoutBtn = document.querySelector(".menuLogin");

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
        eventModal();
    }
}

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function eventModal() {
    modifyProjects.addEventListener("click", function () {
        openModal();
    });
    modal.addEventListener("click", function (e) {
        if (e.target == modal) {
            closeModal();
        }
    });
    cross.addEventListener("click", function () {
        closeModal();
    });
}

async function fetchWorksFromAPI() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const works = await response.json();
        return works;
    } catch (error) {
        console.error("Error fetching works:", error);
    }
}

async function displayWorksInModal() {
    const worksContainer = document.getElementById("works-container");
    worksContainer.innerHTML = "";

    const works = await fetchWorksFromAPI();
    if (works) {
        works.forEach((work) => {
            const workElement = createWorkElement(work);
            worksContainer.appendChild(workElement);
        });
    }
}

function createWorkElement(work) {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    const img = document.createElement("img");
    img.src = work.imageUrl;

    workElement.appendChild(img);

    return workElement;
}

displayWorksInModal();
