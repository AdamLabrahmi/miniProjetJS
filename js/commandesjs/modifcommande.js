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

            const clientNomInput = document.getElementById('commande-client-nom');
            const livreurNomInput = document.getElementById('commande-livreur-nom');
            const nomProduitSelect = document.getElementById('nom-produit');
            const prixProduitInput = document.getElementById('prix-produit');
            const quantiteProduitInput = document.getElementById('quantite-produit');
            const statutSelect = document.getElementById('commande-statut');
            const dateCreationInput = document.getElementById('commande-date-creation');

            if (clientNomInput && livreurNomInput && nomProduitSelect && prixProduitInput && quantiteProduitInput && statutSelect && dateCreationInput) {
                // Récupérer le nom du client et du livreur
                fetch(`http://localhost:3000/clients/${commande.client_id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la récupération du nom du client');
                        }
                        return response.json();
                    })
                    .then(client => {
                        clientNomInput.value = client.nom;
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération du nom du client:', error);
                        alert('Erreur lors de la récupération du nom du client.');
                    });

                fetch(`http://localhost:3000/livreurs/${commande.livreur_id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la récupération du nom du livreur');
                        }
                        return response.json();
                    })
                    .then(livreur => {
                        livreurNomInput.value = livreur.nom;
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération du nom du livreur:', error);
                        alert('Erreur lors de la récupération du nom du livreur.');
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
    const clientNom = document.getElementById('commande-client-nom').value;
    const livreurNom = document.getElementById('commande-livreur-nom').value;
    const nomProduit = document.getElementById('nom-produit').value;
    const prixProduit = document.getElementById('prix-produit').value;
    const quantiteProduit = document.getElementById('quantite-produit').value;
    const statut = document.getElementById('commande-statut').value;
    const dateCreation = document.getElementById('commande-date-creation').value;

    if (clientNom && livreurNom && nomProduit && prixProduit && quantiteProduit && statut && dateCreation) {
        const commande = {
            client_nom: clientNom,
            livreur_nom: livreurNom,
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
                alert('Commande modifiée avec succès.');
                window.location.href = 'tabCom.html'; // Rediriger vers tabCom.html après modification
            } else {
                alert('Erreur lors de la modification de la commande.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification de la commande:', error);
            alert('Erreur lors de la modification de la commande.');
        });
    } else {
        alert('Veuillez remplir tous les champs.');
    }
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