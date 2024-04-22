const modifyProjects = document.getElementById("modify-works");
const cross = document.querySelector(".cross");
const modal = document.querySelector(".containerModal");
// const addPicture = document.getElementById("addPicturebtn");
// const workModal = document.getElementById("addWorkModal");

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

        let modifyWorks = document.getElementById("modify-works");
        modifyWorks.style.display = "flex";

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

// function openWorkModal() {
//     workModal.style.display = "flex";
// }

// function closeWorkModal() {
//     workModal.style.display = "none";
// }

// function eventModal() {
//     addPicture.addEventListener("click", function () {
//         openWorkModal();
//     });
//     workModal.addEventListener("click", function (e) {
//         if (e.target == workModal) {
//             closeWorkModal();
//         }
//     });
//     cross.addEventListener("click", function () {
//         closeWorkModal();
//     });
// }
