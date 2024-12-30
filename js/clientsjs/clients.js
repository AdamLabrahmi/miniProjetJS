// ListerClients
async function loadClients() {
    try {
        const response = await fetch('http://localhost:3000/clients'); // API qui retourne les clients
        const clients = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('clientsTable');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        // Remplir le tableau avec les clients
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b">${client.nom}</td>
                <td class="px-4 py-2 border-b">${client.prenom}</td>
                <td class="px-4 py-2 border-b">${client.telephone}</td>
                <td class="px-4 py-2 border-b">${client.email}</td>
                <td class="px-4 py-2 border-b">${client.adresse}</td>
                <td class="px-4 py-2 border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editClient(${client.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deleteClient(${client.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des clients:', error);
    }
}

// Fonction pour modifier un client
function editClient(id) {
    alert('Modification du client avec ID: ' + id);
    // Logique de modification à implémenter
    // Exemple : rediriger vers une page de modification ou afficher un formulaire
}

// Fonction pour supprimer un client
async function deleteClient(id) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client ?');
    if (confirmation) {
        try {
            const response = await fetch(`http://localhost:3000/clients/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Client supprimé avec succès.');
                loadClients(); // Recharger les clients après suppression
            } else {
                alert('Erreur lors de la suppression du client.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
            alert('Erreur lors de la suppression du client.');
        }
    }
}

// Charger les clients au démarrage
loadClients();