if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../html/index.html'; 
}

// ListerProduits
async function loadProduits() {
    try {
        const response = await fetch('http://localhost:3000/produits'); // API qui retourne les Livreurs
        const produits = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('productsTableBody');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        // Remplir le tableau avec les clients
        produits.forEach(produit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center border-b">${produit.nom}</td>
                <td class="px-4 py-2 text-center border-b">${produit.description}</td>
                <td class="px-4 py-2 text-center border-b">${produit.prix}</td>
                <td class="px-4 py-2 text-center border-b">${produit.stock}</td>
                <td class="px-4 py-2 text-center border-b">${produit.categorie}</td>
                <td class="px-4 py-2 text-center border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editProduit(${produit.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deleteProduit(${produit.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
    }
}

// Fonction pour modifier un client
function editProduit(id) {
    window.location.href = `modification.html?id=${id}`;
    // Logique de modification à implémenter
    // Exemple : rediriger vers une page de modification ou afficher un formulaire
}

// Fonction pour supprimer un client
// ...existing code...


// Fonction pour supprimer un client
async function deleteProduit(id) {
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
    confirmationMessage.textContent = 'Êtes-vous sûr de vouloir supprimer ce produit ?';
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

    // Ajouter les boutons au message de confirmation
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.marginTop = '20px';
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    confirmationMessage.appendChild(buttonContainer);
    overlay.appendChild(confirmationMessage);
    document.body.appendChild(overlay);

    // Gérer les clics sur les boutons
    confirmButton.addEventListener('click', async () => {
        try {
            console.log(`Tentative de suppression du produit avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/produits/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                showMessage('Produit supprimé avec succès.', 'success');
                loadProduits(); // Recharger les produits après suppression
            } else {
                const errorText = await response.text();
                showMessage('Erreur lors de la suppression du produit.', 'error');
                console.error('Erreur lors de la suppression du produit:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            showMessage('Erreur lors de la suppression du produit.', 'error');
        }
        document.body.removeChild(overlay);
    });

    cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // Faire disparaître le message de confirmation après un certain temps
    setTimeout(() => {
        confirmationMessage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }, 1500); // Disparaît après 5 secondes
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
loadProduits();

function downloadExcel() {
    // Récupérer la table par son ID
    const table = document.getElementById('productsTableBody');
    
    // Convertir la table en données JSON
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Générer le fichier Excel
    XLSX.writeFile(workbook, `produits.xlsx`);
}

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}


function searchProduct() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const tableBody = document.getElementById('productsTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const productName = cells[0].textContent || cells[0].innerText;
        if (productName.toLowerCase().indexOf(filter) > -1) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}



function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../../html/index.html';
}