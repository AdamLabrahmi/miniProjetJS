// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); 

    
//     const adminUsername = 'admin';
//     const adminPassword = 'admin';

    
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

    
//     if (username === adminUsername && password === adminPassword) {
//         alert('Login réussi !');
//         window.location.href = 'dashboard.html'; 
//     } else {
//         const errorMessage = document.getElementById('error-message');
//         errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
//         errorMessage.style.display = 'block';
//     }
// });


// fetch('http://127.0.0.1:3000/livreurs')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Erreur:', error));


    // URL de l'API
const apiUrl = 'http://127.0.0.1:3000/livreurs';
const apiUrlc = 'http://127.0.0.1:3000/clients';
const apiUrlcom = 'http://127.0.0.1:3000/commandes';
const apiUrlprod = 'http://127.0.0.1:3000/produits';
const apiUrlzone = 'http://127.0.0.1:3000/zones';




// Fonction pour afficher les livreurs dans le tableau
function afficherLivreurs(livreurs) {
    const tableBody = document.querySelector('#livreurs-table tbody');
    tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données

    livreurs.forEach(livreur => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${livreur.id}</td>
            <td>${livreur.nom}</td>
            <td>${livreur.telephone}</td>
            <td>${livreur.disponibilite}</td>
            <td>${livreur.vehicule}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Récupérer les données depuis l'API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => afficherLivreurs(data))
    .catch(error => console.error('Erreur:', error));



    function afficherClients(clients) {
        const tableBody = document.querySelector('#clients-table tbody');
        tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données
    
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.id}</td>
                <td>${client.nom}</td>
                <td>${client.telephone}</td>
                <td>${client.adresse}</td>
                <td>${client.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetch(apiUrlc)
    .then(response => response.json())
    .then(data => afficherClients(data))
    .catch(error => console.error('Erreur:', error));


    function afficherProduits(produits) {
        const tableBody = document.querySelector('#produits-table tbody');
        tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données
    
        produits.forEach(produit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produit.id}</td>
                <td>${produit.nom}</td>
                <td>${produit.description}</td>
                <td>${produit.prix}</td>
                <td>${produit.categorie}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    fetch(apiUrlprod)
    .then(response => response.json())
    .then(data => afficherProduits(data))
    .catch(error => console.error('Erreur:', error));

    function afficherCommandes(commandes) {
        const tableBody = document.querySelector('#commandes-table tbody');
        tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données
    
        commandes.forEach(commande => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${commande.id}</td>
                <td>${commande.client_id}</td>
                <td>${commande.livreur_id}</td>
                <td>${commande.produits[0].prix}</td>
                <td>${commande.statut}</td>
                <td>${commande.date_creation}</td>
            `;
            tableBody.appendChild(row);
        });
    }



    fetch(apiUrlcom)
    .then(response => response.json())
    .then(data => afficherCommandes(data))
    .catch(error => console.error('Erreur:', error));

    function afficherZone(zones) {
        const tableBody = document.querySelector('#zones-table tbody');
        tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données
    
        zones.forEach(zone => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${zone.id}</td>
                <td>${zone.nom}</td>
                <td>${zone.code}</td>
                <td>${zone.livreurs_disponibles}</td>
            `;
            tableBody.appendChild(row);
        });
    }



    fetch(apiUrlzone)
    .then(response => response.json())
    .then(data => afficherZone(data))
    .catch(error => console.error('Erreur:', error));


    // =======================
    const apiUrlLivreurs = 'http://localhost:3000/livreurs'; // URL pour l'API des livreurs

// Fonction pour afficher les informations sur la zone et la ville d'un livreur
function afficherZoneLivreur(livreur) {
    const resultDiv = document.querySelector('#livreur-zone-result');
    if (livreur) {
        resultDiv.innerHTML = `
            <p><strong>Nom du livreur :</strong> ${livreur.nom}</p>
            <p><strong>Zone :</strong> ${livreur.zone}</p>
            <p><strong>Ville :</strong> ${livreur.ville}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p style="color: red;">Livreur non trouvé.</p>';
    }
}

// Fonction pour rechercher un livreur par son nom
function rechercherLivreur() {
    const searchInput = document.querySelector('#search-livreur-input').value.toLowerCase();

    fetch(apiUrlLivreurs) // Récupère les données des livreurs depuis l'API
        .then(response => response.json())
        .then(data => {
            const livreur = data.find(livreur => livreur.nom.toLowerCase().includes(searchInput));
            afficherZoneLivreur(livreur); // Appelle la fonction pour afficher les informations du livreur
        })
        .catch(error => console.error('Erreur:', error));
}

// Ajout d'un event listener pour effectuer une recherche à chaque saisie dans l'input
document.querySelector('#search-livreur-input').addEventListener('input', rechercherLivreur);

