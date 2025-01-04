document.addEventListener('DOMContentLoaded', function() {
    // Charger les noms des zones
    fetch('http://localhost:3000/zones')
        .then(response => response.json())
        .then(zones => {
            const zoneSelect = document.getElementById('zone-select');
            zones.forEach(zone => {
                const option = document.createElement('option');
                option.value = zone.id; // Utiliser l'ID de la zone
                option.textContent = zone.nom;
                zoneSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des zones:', error);
        });

    // Ajouter un livreur
    document.getElementById('ajouter-livreur-btn').addEventListener('click', function() {
        console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier
        const livreur = {
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            telephone: document.getElementById('telephone').value,
            disponibilite: document.getElementById('disponibilite').value,
            vehicule: document.getElementById('vehicule').value,
            zone_id: document.getElementById('zone-select').value // Ajouter l'ID de la zone
        };

        fetch('http://localhost:3000/livreurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livreur)
        })
        .then(response => response.json())
        .then(data => {
            alert('Livreur ajouté avec succès');
            document.getElementById('ajout-livreur-form').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});