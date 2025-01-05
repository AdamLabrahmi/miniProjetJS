let commandeId;

// Fonction pour récupérer les données de la commande et remplir les champs de saisie
function remplirChampsCommande(id) {
    console.log(`Tentative de récupération des données de la commande avec ID: ${id}`);
    fetch(`http://localhost:3000/commandes/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de la commande');
            }
            return response.json();
        })
        .then(commande => {
            console.log('Données de la commande récupérées:', commande);

            const clientNomSelect = document.getElementById('commande-client-nom');
            const livreurNomSelect = document.getElementById('commande-livreur-nom');
            const nomProduitSelect = document.getElementById('nom-produit');
            const prixProduitInput = document.getElementById('prix-produit');
            const quantiteProduitInput = document.getElementById('quantite-produit');
            const statutSelect = document.getElementById('commande-statut');
            const dateCreationInput = document.getElementById('commande-date-creation');

            if (clientNomSelect && livreurNomSelect && nomProduitSelect && prixProduitInput && quantiteProduitInput && statutSelect && dateCreationInput) {
                // Charger les noms des clients dans le menu déroulant
                fetch('http://localhost:3000/clients')
                    .then(response => response.json())
                    .then(clients => {
                        clients.forEach(client => {
                            const option = document.createElement('option');
                            option.value = client.id;
                            option.textContent = client.nom;
                            clientNomSelect.appendChild(option);
                        });
                        clientNomSelect.value = commande.client_id;
                        clientNomSelect.disabled = true; // Désactiver le sélecteur après remplissage
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des noms des clients:', error);
                        alert('Erreur lors de la récupération des noms des clients.');
                    });

                // Charger les noms des livreurs dans le menu déroulant
                fetch('http://localhost:3000/livreurs')
                    .then(response => response.json())
                    .then(livreurs => {
                        livreurs.forEach(livreur => {
                            const option = document.createElement('option');
                            option.value = livreur.id;
                            option.textContent = livreur.nom;
                            livreurNomSelect.appendChild(option);
                        });
                        livreurNomSelect.value = commande.livreur_id;
                        livreurNomSelect.disabled = true; // Désactiver le sélecteur après remplissage
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des noms des livreurs:', error);
                        alert('Erreur lors de la récupération des noms des livreurs.');
                    });

                // Charger les noms des produits dans le menu déroulant
                fetch('http://localhost:3000/produits')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la récupération des noms des produits');
                        }
                        return response.json();
                    })
                    .then(produits => {
                        produits.forEach(produit => {
                            const option = document.createElement('option');
                            option.value = produit.nom;
                            option.textContent = produit.nom;
                            nomProduitSelect.appendChild(option);
                        });

                        // Sélectionner le produit de la commande
                        const produitCommande = commande.produits[0];
                        if (produitCommande) {
                            nomProduitSelect.value = produitCommande.nom;
                            prixProduitInput.value = produitCommande.prix;
                            quantiteProduitInput.value = produitCommande.quantite;
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des noms des produits:', error);
                        alert('Erreur lors de la récupération des noms des produits.');
                    });

                statutSelect.value = commande.statut;
                dateCreationInput.value = commande.date_creation;
            } else {
                console.error('Un ou plusieurs éléments avec les IDs spécifiés sont introuvables.');
                alert('Erreur lors de la récupération des données de la commande.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de la commande:', error);
            alert('Erreur lors de la récupération des données de la commande.');
        });
}

// Fonction pour modifier une commande
function modifCommande() {
    // Récupérer les valeurs des champs de saisie
    const clientId = document.getElementById('commande-client-nom').value;
    const livreurId = document.getElementById('commande-livreur-nom').value;
    const nomProduit = document.getElementById('nom-produit').value;
    const prixProduit = document.getElementById('prix-produit').value;
    const quantiteProduit = document.getElementById('quantite-produit').value;
    const statut = document.getElementById('commande-statut').value;
    const dateCreation = document.getElementById('commande-date-creation').value;

    if (clientId && livreurId && nomProduit && prixProduit && quantiteProduit && statut && dateCreation) {
        const commande = {
            client_id: clientId,
            livreur_id: livreurId,
            produits: [{ nom: nomProduit, prix: prixProduit, quantite: quantiteProduit }],
            statut: statut,
            date_creation: dateCreation
        };

        // Envoyer les modifications au serveur
        fetch(`http://localhost:3000/commandes/${commandeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commande)
        })
        .then(response => {
            if (response.ok) {
                showMessage('Commande modifiée avec succès.', 'success');
                setTimeout(() => {
                    window.location.href = 'tabCom.html'; // Rediriger vers tabCom.html après modification
                }, 3000);
            } else {
                showMessage('Erreur lors de la modification de la commande.', 'error');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification de la commande:', error);
            showMessage('Erreur lors de la modification de la commande.', 'error');
        });
    } else {
        showMessage('Veuillez remplir tous les champs.', 'error');
    }
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
    }, 3000);
}

// Appeler la fonction pour remplir les champs de saisie lorsque la page se charge
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    commandeId = urlParams.get('id');
    if (commandeId) {
        remplirChampsCommande(commandeId);
    } else {
        alert('ID de la commande manquant dans l\'URL.');
    }

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifCommande);
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