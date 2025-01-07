if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../html/index.html'; 
}

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
// async function deleteClient(id) {
//     const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce client ?');
//     if (confirmation) {
//         try {
//             console.log(`Tentative de suppression du client avec ID: ${id}`);
//             const response = await fetch(`http://localhost:3000/clients/${id}`, {
//                 method: 'DELETE'
//             });
//             if (response.ok) {
//                 alert('Client supprimé avec succès.');
//                 console.log('Client supprimé avec succès.');
//                 loadClients(); // Recharger les clients après suppression
//             } else {
//                 const errorText = await response.text();
//                 alert('Erreur lors de la suppression du client.');
//                 console.error('Erreur lors de la suppression du client:', errorText);
//             }
//         } catch (error) {
//             console.error('Erreur lors de la suppression du client:', error);
//             alert('Erreur lors de la suppression du client.');
//         }
//     }
// }


async function deleteClient(id) {
    // Créer l'overlay pour le message de confirmation
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.zIndex = '999';

    // Créer le message de confirmation
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = 'Êtes-vous sûr de vouloir supprimer ce client ?';
    confirmationMessage.style.position = 'fixed';
    confirmationMessage.style.top = '50%';
    confirmationMessage.style.left = '50%';
    confirmationMessage.style.transform = 'translate(-50%, -50%)';
    confirmationMessage.style.backgroundColor = 'white';
    confirmationMessage.style.color = 'black';
    confirmationMessage.style.padding = '40px';
    confirmationMessage.style.borderRadius = '10px';
    confirmationMessage.style.fontSize = '24px';
    confirmationMessage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
    confirmationMessage.style.zIndex = '1000';

    // Créer un conteneur pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.marginTop = '20px';

    // Créer les boutons de confirmation et d'annulation
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmer';
    confirmButton.style.marginRight = '20px';
    confirmButton.style.backgroundColor = '#4CAF50'; // Couleur verte
    confirmButton.style.color = 'white';
    confirmButton.style.border = 'none';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annuler';
    cancelButton.style.backgroundColor = '#f44336'; // Couleur rouge
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';

    // Ajouter les boutons au conteneur
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    // Ajouter le conteneur de boutons au message de confirmation
    confirmationMessage.appendChild(buttonContainer);
    overlay.appendChild(confirmationMessage);
    document.body.appendChild(overlay);

    // Gérer les clics sur les boutons
    confirmButton.addEventListener('click', async () => {
        try {
            console.log(`Tentative de suppression du client avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/clients/${id}`, { method: 'DELETE' });
            document.body.removeChild(overlay); // Retirer l'overlay de confirmation avant d'afficher le message de succès
            if (response.ok) {
                showMessage('Client supprimé avec succès.', 'success');
                loadClients(); // Recharger les clients après suppression
            } else {
                const errorText = await response.text();
                showMessage('Erreur lors de la suppression du client.', 'error');
                console.error('Erreur lors de la suppression du client:', errorText);
            }
        } catch (error) {
            document.body.removeChild(overlay); // Retirer l'overlay de confirmation en cas d'erreur
            console.error('Erreur lors de la suppression du client:', error);
            showMessage('Erreur lors de la suppression du client.', 'error');
        }
    });

    cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

function showMessage(message, type) {
    // Créer l'overlay pour le message
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.zIndex = '999';

    // Créer le message
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.backgroundColor = 'white';
    messageBox.style.color = 'black';
    messageBox.style.padding = '40px';
    messageBox.style.borderRadius = '10px';
    messageBox.style.fontSize = '24px';
    messageBox.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
    messageBox.style.transition = 'opacity 0.5s ease';
    messageBox.style.zIndex = '1000';

    if (type === 'success') {
        messageBox.style.backgroundColor = '#4CAF50'; // Couleur verte pour le succès
        messageBox.style.color = 'white';
    } else if (type === 'error') {
        messageBox.style.backgroundColor = '#f44336'; // Couleur rouge pour l'erreur
        messageBox.style.color = 'white';
    }

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }, 1500);
}

// Charger les clients au démarrage
loadClients();

function downloadExcel() {
    // Récupérer la table par son ID
    const table = document.getElementById('clientsTable');
    
    // Convertir la table en données JSON
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Générer le fichier Excel
    XLSX.writeFile(workbook, 'clients.xlsx');
}

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}


function filterClients() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableBody = document.getElementById('clientsTable');
    const rows = tableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const nom = row.cells[0].textContent.toLowerCase();
        const prenom = row.cells[1].textContent.toLowerCase();
        if (nom.includes(searchInput) || prenom.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}



function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../../html/index.html';
}
