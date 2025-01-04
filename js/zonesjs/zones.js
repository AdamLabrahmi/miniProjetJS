// ListerZOnes
async function loadZones() {
    try {
        const response = await fetch('http://localhost:3000/zones'); // API qui retourne les zones
        const zones = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('zonesTableBody');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        // Remplir le tableau avec les clients
        zones.forEach(zone => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center border-b">${zone.nom}</td>
                <td class="px-4 py-2 text-center border-b">${zone.ville}</td>
                <td class="px-4 py-2 text-center border-b">${zone.code}</td>
                <td class="px-4 py-2 text-center border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editzone(${zone.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deletezone(${zone.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des zones:', error);
    }
}



// Fonction pour supprimer un client
async function deletezone(id) {
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
    confirmationMessage.textContent = 'Êtes-vous sûr de vouloir supprimer cette zone ?';
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
            console.log(`Tentative de suppression de la zone avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/zones/${id}`, { method: 'DELETE' });
            document.body.removeChild(overlay); // Retirer l'overlay de confirmation avant d'afficher le message de succès
            if (response.ok) {
                showMessage('Zone supprimée avec succès.', 'success');
                loadZones(); // Recharger les zones après suppression
            } else {
                const errorText = await response.text();
                showMessage('Erreur lors de la suppression de la zone.', 'error');
                console.error('Erreur lors de la suppression de la zone:', errorText);
            }
        } catch (error) {
            document.body.removeChild(overlay); // Retirer l'overlay de confirmation en cas d'erreur
            console.error('Erreur lors de la suppression de la zone:', error);
            showMessage('Erreur lors de la suppression de la zone.', 'error');
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
    }, 3000);
}

// Charger les clients au démarrage
loadZones();

function downloadExcel() {
    // Récupérer la table par son ID
    const table = document.getElementById('zonesTableBody');
    
    // Convertir la table en données JSON
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Générer le fichier Excel
    XLSX.writeFile(workbook, `zones.xlsx`);
}

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}