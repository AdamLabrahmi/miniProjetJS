// ListerCommandes
async function loadCommandes() {
    try {
        const response = await fetch('http://localhost:3000/commandes'); // API qui retourne les Livreurs
        const commandes = await response.json();

        // Cibler le corps du tableau
        const tableBody = document.getElementById('ordersTableBody');
        tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

        // Remplir le tableau avec les clients
        commandes.forEach(commande => {
            const row = document.createElement('tr');
            const total = commande.produits.reduce((acc, produit) => acc + (produit.prix * produit.quantite), 0);
            row.innerHTML = `
                <td class="px-4 py-2 text-center border-b">${commande.id}</td>
                <td class="px-4 py-2 text-center border-b">${commande.client_id}</td>
                <td class="px-4 py-2 text-center border-b">${commande.livreur_id}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits[0].nom}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits[0].quantite}</td>
                <td class="px-4 py-2 text-center border-b">${commande.produits[0].prix}</td>
                <td class="px-4 py-2 text-center border-b">${total}</td>
                <td class="px-4 py-2 text-center border-b">${commande.statut}</td>
                <td class="px-4 py-2 text-center border-b">
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded mr-2" onclick="editCommande(${commande.id})">Modifier</button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deleteCommande(${commande.id})">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des livreurs:', error);
    }
}

// Fonction pour modifier un client
function editClient(id) {
    alert('Modification du client avec ID: ' + id);
    // Logique de modification à implémenter
    // Exemple : rediriger vers une page de modification ou afficher un formulaire
}

// Fonction pour supprimer un client
// ...existing code...


// Fonction pour supprimer un client
// async function deletelivreur(id) {
//     const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?');
//     if (confirmation) {
//         try {
//             console.log(`Tentative de suppression du Livreur avec ID: ${id}`);
//             const response = await fetch(`http://localhost:3000/livreurs/${id}`, {
//                 method: 'DELETE'
//             });
//             if (response.ok) {
//                 alert('Livreur supprimé avec succès.');
//                 console.log('Livreur supprimé avec succès.');
//                 loadLivreurs(); // Recharger les livreurs après suppression
//             } else {
//                 const errorText = await response.text();
//                 alert('Erreur lors de la suppression du livreur.');
//                 console.error('Erreur lors de la suppression du livreur:', errorText);
//             }
//         } catch (error) {
//             console.error('Erreur lors de la suppression du livreur:', error);
//             alert('Erreur lors de la suppression du livreur.');
//         }
//     }
// }

// Charger les clients au démarrage
loadCommandes();