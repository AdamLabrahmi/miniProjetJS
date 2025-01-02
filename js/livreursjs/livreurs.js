// ListerLivreurs
async function loadLivreurs() {
    try {
        const response = await fetch('http://localhost:3000/livreurs'); // API qui retourne les Livreurs
        const livreurs = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('livreursTableBody');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        // Remplir le tableau avec les clients
        livreurs.forEach(livreur => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center border-b">${livreur.nom}</td>
                <td class="px-4 py-2 text-center border-b">${livreur.prenom}</td>
                <td class="px-4 py-2 text-center border-b">${livreur.telephone}</td>
                <td class="px-4 py-2 text-center border-b">${livreur.disponibilite}</td>
                <td class="px-4 py-2 text-center border-b">${livreur.vehicule}</td>
                <td class="px-4 py-2 text-center border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editlivreur(${livreur.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deletelivreur(${livreur.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des livreurs:', error);
    }
}

// Fonction pour modifier un client
function editlivreur(id) {
    // alert('Modification du client avec ID: ' + id);
    window.location.href = `modification.html?id=${id}`;
    // Exemple : rediriger vers une page de modification ou afficher un formulaire
}
function editClient(id) {
}
// Fonction pour supprimer un client
// ...existing code...


// Fonction pour supprimer un client
async function deletelivreur(id) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?');
    if (confirmation) {
        try {
            console.log(`Tentative de suppression du Livreur avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/livreurs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Livreur supprimé avec succès.');
                console.log('Livreur supprimé avec succès.');
                loadLivreurs(); // Recharger les livreurs après suppression
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la suppression du livreur.');
                console.error('Erreur lors de la suppression du livreur:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du livreur:', error);
            alert('Erreur lors de la suppression du livreur.');
        }
    }
}

// Charger les clients au démarrage
loadLivreurs();