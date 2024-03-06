// Fonction pour envoyer des données à l'API en utilisant la méthode POST
async function postData(url, body) {
    try {
        console.log(`Envoi de données à : ${url}`);
        const response = await fetch(url, {
            method: 'POST',  // Utilise la méthode POST pour la requête
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur de Fetch :", error);
        throw error; // Re-lancer l'erreur pour la propager au bloc catch suivant
    }
}

// Fonctionnalité pour gérer la soumission du formulaire et la redirection
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const apiUrl = 'http://localhost:5678/api/users/login';
            const postDataExample = { email, password };

            const result = await postData(apiUrl, postDataExample);

            // Vérifier la réponse de l'API et rediriger si la connexion est réussie
            if (result.success) {
                console.log('Connexion réussie. Redirection vers index.html');
                window.location.href = 'index.html';
            } else {
                console.error('Échec de la connexion. Message du serveur :', result.message);
                // Gérer l'échec de la connexion, afficher un message d'erreur, etc.
            }
        } catch (error) {
            console.error('Échec de la connexion. Erreur :', error);
            // Gérer d'autres erreurs, afficher un message d'erreur, etc.
        }
    });
});
