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
                <td class="px-4 py-2 text-center border-b">${client.nom}</td>
                <td class="px-4 py-2 text-center border-b">${client.prenom}</td>
                <td class="px-4 py-2 text-center border-b">${client.telephone}</td>
                <td class="px-4 py-2 text-center border-b">${client.email}</td>
                <td class="px-4 py-2 text-center border-b">${client.adresse}</td>
                <td class="px-4 py-2 text-center border-b">
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

// Fonction pour rediriger vers la page de modification
function editClient(id) {
    window.location.href = `modification.html?id=${id}`;
}


// Fonction pour supprimer un client
// ...existing code...

// Fonction pour supprimer un client
async function deleteClient(id) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client ?');
    if (confirmation) {
        try {
            console.log(`Tentative de suppression du client avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/clients/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Client supprimé avec succès.');
                console.log('Client supprimé avec succès.');
                loadClients(); // Recharger les clients après suppression
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la suppression du client.');
                console.error('Erreur lors de la suppression du client:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
            alert('Erreur lors de la suppression du client.');
        }
    }
}

// ...existing code...

// Charger les clients au démarrage
loadClients();