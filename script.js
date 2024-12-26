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
            <td>${livreur.zone}</td>
            <td>${livreur.statut}</td>
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
                <td>${client.zone}</td>
                <td>${client.statut}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetch(apiUrlc)
    .then(response => response.json())
    .then(data => afficherClients(data))
    .catch(error => console.error('Erreur:', error));


    function afficherCommandes(commandes) {
        const tableBody = document.querySelector('#commandes-table tbody');
        tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données
    
        commandes.forEach(commande => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${commande.id}</td>
                <td>${commande.nom}</td>
                <td>${commande.telephone}</td>
                <td>${commande.zone}</td>
                <td>${commande.statut}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetch(apiUrlcom)
    .then(response => response.json())
    .then(data => afficherCommandes(data))
    .catch(error => console.error('Erreur:', error));