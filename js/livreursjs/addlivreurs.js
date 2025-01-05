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
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const telephone = document.getElementById('telephone').value;
        const disponibilite = document.getElementById('disponibilite').value;
        const vehicule = document.getElementById('vehicule').value;
        const zoneId = document.getElementById('zone-select').value;

        if (nom && prenom && telephone && disponibilite && vehicule && zoneId) {
            const livreur = {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                disponibilite: disponibilite,
                vehicule: vehicule,
                zone_id: zoneId // Ajouter l'ID de la zone
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
                showMessage('Livreur ajouté avec succès', 'success');
                document.getElementById('ajout-livreur-form').reset();
            })
            .catch(error => {
                console.error('Erreur:', error);
                showMessage('Erreur lors de l\'ajout du livreur.', 'error');
            });
        } else {
            showMessage('Veuillez remplir tous les champs.', 'error');
        }
    });
});

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
            window.location.href = 'tabL.html'; 
        }, 500);
    }, 3000);
}

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}