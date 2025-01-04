// ListerCommandes lakhar
async function loadCommandes() {
    try {
        const response = await fetch('http://localhost:3000/commandes'); // API qui retourne les commandes
        const commandes = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('ordersTableBody');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        for (const commande of commandes) {
            const clientResponse = await fetch(`http://localhost:3000/clients/${commande.client_id}`);
            const livreurResponse = await fetch(`http://localhost:3000/livreurs/${commande.livreur_id}`);

            if (!clientResponse.ok || !livreurResponse.ok) {
                throw new Error('Erreur lors de la récupération des noms des clients ou des livreurs');
            }

            const client = await clientResponse.json();
            const livreur = await livreurResponse.json();

            const total = commande.produits.reduce((acc, produit) => acc + (produit.prix * produit.quantite), 0);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 text-center border-b">${client.nom}</td>
                <td class="px-4 py-2 text-center border-b">${livreur.nom}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits.map(p => p.nom).join(', ')}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits.map(p => p.quantite).join(', ')}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits.map(p => p.prix).join(', ')}</td>
                <td class="px-4 py-2 text-center border-b">${total}</td>
                <td class="px-4 py-2 text-center border-b">${commande.statut}</td>
                <td class="px-4 py-2 text-center border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editCommande(${commande.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deleteCommande(${commande.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
        alert('Erreur lors du chargement des commandes.');
    }
}

// Fonction pour modifier une commande
function editCommande(id) {
    window.location.href = `modification.html?id=${id}`;
}

// Fonction pour supprimer une commande
async function deleteCommande(id) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
    if (confirmation) {
        try {
            console.log(`Tentative de suppression de la commande avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/commandes/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Commande supprimée avec succès.');
                console.log('Commande supprimée avec succès.');
                loadCommandes(); // Recharger les commandes après suppression
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la suppression de la commande.');
                console.error('Erreur lors de la suppression de la commande:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
            alert('Erreur lors de la suppression de la commande.');
        }
    }
}

// Charger les commandes au démarrage
document.addEventListener('DOMContentLoaded', loadCommandes);

    // downloadExcel;
    function downloadExcel() {
        // Récupérer la table par son ID
        const commandes = document.getElementById('ordersTableBody');
        
        // Convertir la table en données JSON
        const workbook = XLSX.utils.table_to_book(commandes, { sheet: "Sheet1" });
    
        // Générer le fichier Excel
        XLSX.writeFile(workbook, 'commandes.xlsx');
    }

    function toggleDropdown(id) {
        var dropdown = document.getElementById(id);
        if (dropdown.classList.contains('hidden')) {
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    }