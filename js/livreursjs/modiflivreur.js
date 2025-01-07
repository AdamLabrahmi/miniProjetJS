if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../html/index.html'; 
}

let livreurId = null;

// Fonction pour récupérer les données du livreur et remplir les champs de saisie
function remplirChampsLivreur(id) {
    console.log(`Tentative de récupération des données du livreur avec ID: ${id}`);
    fetch(`http://localhost:3000/livreurs/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du livreur');
            }
            return response.json();
        })
        .then(livreur => {
            console.log('Données du livreur récupérées:', livreur);
            document.getElementById('livreur-nom').value = livreur.nom || '';
            document.getElementById('livreur-prenom').value = livreur.prenom || '';
            document.getElementById('livreur-telephone').value = livreur.telephone || '';
            document.getElementById('disponibilite').value = livreur.disponibilite || '';
            document.getElementById('vehicule').value = livreur.vehicule || '';

            // Vérifier si l'ID de la zone est défini
            if (livreur.zone_id) {
                fetch(`http://localhost:3000/zones/${livreur.zone_id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la récupération du nom de la zone');
                        }
                        return response.json();
                    })
                    .then(zone => {
                        if (zone && zone.nom) {
                            document.getElementById('nomzone-select').value = zone.nom;
                        } else {
                            throw new Error('Nom de la zone non trouvé');
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération du nom de la zone:', error);
                        showMessage('Erreur lors de la récupération du nom de la zone.', 'error');
                    });
            } else {
                console.error('ID de la zone non défini pour ce livreur.');
                showMessage('ID de la zone non défini pour ce livreur.', 'error');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du livreur:', error);
            showMessage('Erreur lors de la récupération des données du livreur.', 'error');
        });
}

// Fonction pour charger les noms des zones dans le menu déroulant
function chargerNomsZones() {
    fetch('http://localhost:3000/zones')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des noms des zones');
            }
            return response.json();
        })
        .then(zones => {
            const select = document.getElementById('nomzone-select');
            zones.forEach(zone => {
                const option = document.createElement('option');
                option.value = zone.nom;
                option.textContent = zone.nom;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des noms des zones:', error);
            showMessage('Erreur lors de la récupération des noms des zones.', 'error');
        });
}

// Fonction pour modifier un livreur
function modifLivreur() {
    // Récupérer les valeurs des champs de saisie
    const newNom = document.getElementById('livreur-nom').value;
    const newPrenom = document.getElementById('livreur-prenom').value;
    const newTelephone = document.getElementById('livreur-telephone').value;
    const newDisponibilite = document.getElementById('disponibilite').value;
    const newVehicule = document.getElementById('vehicule').value;
    const nomZone = document.getElementById('nomzone-select').value;

    if (newNom && newPrenom && newTelephone && newDisponibilite && newVehicule && nomZone) {
        // Récupérer l'ID de la zone à partir de son nom
        fetch(`http://localhost:3000/zones/id?nom=${encodeURIComponent(nomZone)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Zone non trouvée');
                }
                return response.json();
            })
            .then(zoneData => {
                const zoneId = zoneData.id;

                const livreur = {
                    nom: newNom,
                    prenom: newPrenom,
                    telephone: newTelephone,
                    disponibilite: newDisponibilite,
                    vehicule: newVehicule,
                    zone_id: zoneId // Stocker l'ID de la zone
                };

                // Envoyer les modifications au serveur
                fetch(`http://localhost:3000/livreurs/${livreurId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(livreur)
                })
                .then(response => {
                    if (response.ok) {
                        showMessage('Livreur modifié avec succès.', 'success');
                        setTimeout(() => {
                            window.location.href = 'tabL.html'; // Rediriger vers tabL.html après modification
                        }, 1500);
                    } else {
                        showMessage('Erreur lors de la modification du livreur.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la modification du livreur:', error);
                    showMessage('Erreur lors de la modification du livreur.', 'error');
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'ID de la zone:', error);
                // showMessage('Erreur lors de la récupération de l\'ID de la zone.', 'error');
            });
    } else {
        showMessage('Veuillez remplir tous les champs.', 'error');
    }
}

// Appeler les fonctions pour remplir les champs de saisie et charger les noms des zones lorsque la page se charge
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    livreurId = urlParams.get('id');
    if (livreurId) {
        remplirChampsLivreur(livreurId);
    } else {
        showMessage('ID du livreur manquant dans l\'URL.', 'error');
    }

    // Charger les noms des zones dans le menu déroulant
    chargerNomsZones();

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifLivreur);
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
    } 
    else if (type === 'error') {
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

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../../html/index.html';
}