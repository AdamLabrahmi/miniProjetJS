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
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette zone ?');
    if (confirmation) {
        try {
            console.log(`Tentative de suppression du zone avec ID: ${id}`);
            const response = await fetch(`http://localhost:3000/zones/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Zones supprimé avec succès.');
                console.log('Zones supprimé avec succès.');
                loadZones(); // Recharger les livreurs après suppression
            } else {
                const errorText = await response.text();
                alert('Erreur lors de la suppression du zone.');
                console.error('Erreur lors de la suppression du zone:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du zone:', error);
            alert('Erreur lors de la suppression du zone.');
        }
    }
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