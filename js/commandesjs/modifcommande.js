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
            const categorieProduitSelect = document.getElementById('categorie-produit');
            const prixProduitInput = document.getElementById('prix-produit');
            const quantiteProduitInput = document.getElementById('quantite-produit');
            const statutSelect = document.getElementById('commande-statut');
            const dateCreationInput = document.getElementById('commande-date-creation');

            if (clientNomSelect && livreurNomSelect && nomProduitSelect && categorieProduitSelect && prixProduitInput && quantiteProduitInput && statutSelect && dateCreationInput) {
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

                // Charger les catégories des produits dans le menu déroulant
                fetch('http://localhost:3000/categories')
                    .then(response => response.json())
                    .then(categories => {
                        categories.forEach(categorie => {
                            const option = document.createElement('option');
                            option.value = categorie.id;
                            option.textContent = categorie.nom;
                            categorieProduitSelect.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des catégories des produits:', error);
                        alert('Erreur lors de la récupération des catégories des produits.');
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
    const categorieProduit = document.getElementById('categorie-produit').value;
    const prixProduit = document.getElementById('prix-produit').value;
    const quantiteProduit = document.getElementById('quantite-produit').value;
    const statut = document.getElementById('commande-statut').value;
    const dateCreation = document.getElementById('commande-date-creation').value;

    if (clientId && livreurId && nomProduit && categorieProduit && prixProduit && quantiteProduit && statut && dateCreation) {
        const commande = {
            client_id: clientId,
            livreur_id: livreurId,
            produits: [{ nom: nomProduit, categorie: categorieProduit, prix: prixProduit, quantite: quantiteProduit }],
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