if (localStorage.getItem('authenticated') !== 'true') {
    localStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = 'index.html';
}

// sidebar
function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}

    // URL de l'API
const apiUrl = 'http://127.0.0.1:3000/livreurs';
const apiUrlc = 'http://127.0.0.1:3000/clients';
const apiUrlcom = 'http://127.0.0.1:3000/commandes';
const apiUrlprod = 'http://127.0.0.1:3000/produits';
const apiUrlzone = 'http://127.0.0.1:3000/zones';




// Fonction pour afficher les livreurs dans le tableau
function afficherLivreurs(livreurs) {
    const tableBody = document.querySelector('#livreurs-table tbody');
    tableBody.innerHTML = ''; 

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
        tableBody.innerHTML = ''; 
    
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
        tableBody.innerHTML = ''; 
    
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
        tableBody.innerHTML = ''; 
    
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
        tableBody.innerHTML = ''; 
    
        zones.forEach(zone => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${zone.id}</td>
                <td>${zone.nom}</td>
                <td>${zone.ville}</td>
                <td>${zone.code}</td>
            `;
            tableBody.appendChild(row);
        });
    }



    fetch(apiUrlzone)
    .then(response => response.json())
    .then(data => afficherZone(data))
    .catch(error => console.error('Erreur:', error));


    // =======================

// Fonction pour afficher les informations sur la zone et la ville d'un livreur
function afficherZoneLivreur(livreur, zones) {
    const resultDiv = document.querySelector('#livreur-zone-result');
    if (livreur) {
        const zone = zones.find(zone => zone.id === livreur.zone_id);
        if (zone) {
            // resultDiv.innerHTML = `Le livreur ${livreur.nom} est dans la zone ${zone.nom} (${zone.ville}).`;
            resultDiv.innerHTML = `
            <p><strong>Nom du livreur :</strong> ${livreur.nom}</p>
            <p><strong>Zone :</strong> ${zone.nom}</p>
            <p><strong>Ville :</strong> ${zone.ville}</p>
        `;

        } else {
            resultDiv.innerHTML = 'Zone non trouvée.';
        }
    } else {
        resultDiv.innerHTML = 'Livreur non trouvé.';
    }
}

// Fonction pour rechercher un livreur par nom
function rechercherLivreur() {
    const searchInput = document.querySelector('#search-livreur-input').value.toLowerCase();
    fetch(apiUrl)
        .then(response => response.json())
        .then(livreurs => {
            const livreur = livreurs.find(livreur => livreur.nom.toLowerCase().includes(searchInput));
            fetch(apiUrlzone)
                .then(response => response.json())
                .then(zones => {
                    afficherZoneLivreur(livreur, zones);
                })
                .catch(error => console.error('Erreur:', error));
        })
        .catch(error => console.error('Erreur:', error));
}

// Ajout d'un event listener pour effectuer une recherche à chaque saisie dans l'input
document.querySelector('#search-livreur-input').addEventListener('input', rechercherLivreur);

// Initial fetch to display all livreurs and zones
fetch(apiUrl)
    .then(response => response.json())
    .then(data => afficherLivreurs(data))
    .catch(error => console.error('Erreur:', error));

fetch(apiUrlzone)
    .then(response => response.json())
    .then(data => afficherZones(data))
    .catch(error => console.error('Erreur:', error));



    // downloadExcel;
    function downloadExcel(tableId) {
        // Récupérer la table par son ID
        const table = document.getElementById(tableId);
        
        // Convertir la table en données JSON
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    
        // Générer le fichier Excel
        XLSX.writeFile(workbook, `${tableId}.xlsx`);
    }