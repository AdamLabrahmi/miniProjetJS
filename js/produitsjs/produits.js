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
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    if (confirmation) {
        try {
            console.log(`Tentative de suppression du produit avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/produits/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('produit supprimé avec succès.');
                console.log('produit supprimé avec succès.');
                loadProduits(); // Recharger les livreurs après suppression
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la suppression du produit.');
                console.error('Erreur lors de la suppression du produit:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
            alert('Erreur lors de la suppression du produit.');
        }
    }
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