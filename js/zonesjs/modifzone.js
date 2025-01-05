document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modificationForm');
    const zoneNameInput = document.getElementById('zoneName');
    const villeInput = document.getElementById('ville');
    const codeInput = document.getElementById('code');

    // Récupérer l'ID de la zone à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const zoneId = urlParams.get('id');

    // Fonction pour charger les données de la zone
    async function loadZoneData(id) {
        try {
            const response = await fetch(`http://localhost:3000/zones/${id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de la zone');
            }
            const zone = await response.json();
            zoneNameInput.value = zone.nom;
            villeInput.value = zone.ville;
            codeInput.value = zone.code;
        } catch (error) {
            console.error('Erreur lors du chargement des données de la zone:', error);
            alert('Erreur lors du chargement des données de la zone.');
        }
    }

    // Charger les données de la zone au démarrage
    if (zoneId) {
        loadZoneData(zoneId);
    } else {
        alert('ID de la zone manquant dans l\'URL.');
    }

    // Gérer la soumission du formulaire
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const updatedZone = {
            nom: zoneNameInput.value,
            ville: villeInput.value,
            code: codeInput.value
        };

        try {
            const response = await fetch(`http://localhost:3000/zones/${zoneId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedZone)
            });

            if (response.ok) {
                showMessage('Zone modifiée avec succès.', 'success');
                setTimeout(() => {
                    window.location.href = 'tabZ.html'; 
                }, 3000);
            } else {
                showMessage('Erreur lors de la modification de la zone.', 'error');
            }
        } catch (error) {
            console.error('Erreur lors de la modification de la zone:', error);
            showMessage('Erreur lors de la modification de la zone.', 'error');
        }
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
            }, 500);
        }, 3000);
    }
});

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