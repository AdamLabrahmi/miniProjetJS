let livreurId;

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
                // Récupérer le nom de la zone à partir de l'ID de la zone
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
                        alert('Erreur lors de la récupération du nom de la zone.');
                    });
            } else {
                console.error('ID de la zone non défini pour ce livreur.');
                alert('ID de la zone non défini pour ce livreur.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du livreur:', error);
            alert('Erreur lors de la récupération des données du livreur.');
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
            alert('Erreur lors de la récupération des noms des zones.');
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
                        alert('Livreur modifié avec succès.');
                        window.location.href = 'tabL.html'; // Rediriger vers tabL.html après modification
                    } else {
                        alert('Erreur lors de la modification du livreur.');
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la modification du livreur:', error);
                    alert('Erreur lors de la modification du livreur.');
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'ID de la zone:', error);
                alert('Erreur lors de la récupération de l\'ID de la zone.');
            });
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Appeler les fonctions pour remplir les champs de saisie et charger les noms des zones lorsque la page se charge
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    livreurId = urlParams.get('id');
    if (livreurId) {
        remplirChampsLivreur(livreurId);
    } else {
        alert('ID du livreur manquant dans l\'URL.');
    }

    // Charger les noms des zones dans le menu déroulant
    chargerNomsZones();

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifLivreur);
});