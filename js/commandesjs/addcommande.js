document.addEventListener('DOMContentLoaded', function() {
    // Charger les noms des clients
    fetch('http://localhost:3000/clients')
        .then(response => response.json())
        .then(clients => {
            const clientSelect = document.getElementById('client-nom');
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.nom;
                option.textContent = client.nom;
                clientSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des clients:', error);
        });

    // Charger les noms des livreurs
    fetch('http://localhost:3000/livreurs')
        .then(response => response.json())
        .then(livreurs => {
            const livreurSelect = document.getElementById('livreur-nom');
            livreurs.forEach(livreur => {
                const option = document.createElement('option');
                option.value = livreur.nom;
                option.textContent = livreur.nom;
                livreurSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des livreurs:', error);
        });

    // Charger les noms des produits
    fetch('http://localhost:3000/produits')
        .then(response => response.json())
        .then(produits => {
            const produitSelect = document.getElementById('produit-nom');
            produits.forEach(produit => {
                const option = document.createElement('option');
                option.value = produit.nom;
                option.textContent = produit.nom;
                produitSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des produits:', error);
        });
});

document.getElementById('ajouter-commande-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier

    const clientNom = document.getElementById('client-nom').value;
    const livreurNom = document.getElementById('livreur-nom').value;
    const produitNom = document.getElementById('produit-nom').value;
    const quantite = parseInt(document.getElementById('quantite').value, 10);

    // Fetch client ID
    fetch(`http://localhost:3000/clients?nom=${clientNom}`)
        .then(response => response.json())
        .then(clientData => {
            if (clientData.length === 0) {
                throw new Error('Client non trouvé');
            }
            const clientId = clientData[0].id;

            // Fetch livreur ID
            return fetch(`http://localhost:3000/livreurs?nom=${livreurNom}`)
                .then(response => response.json())
                .then(livreurData => {
                    if (livreurData.length === 0) {
                        throw new Error('Livreur non trouvé');
                    }
                    const livreurId = livreurData[0].id;

                    // Fetch product price
                    return fetch(`http://localhost:3000/produits?nom=${encodeURIComponent(produitNom)}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Produit non trouvé');
                            }
                            return response.json();
                        })
                        .then(produitData => {
                            const prix = produitData[0].prix;

                            // Create commande with client, livreur IDs and product price
                            const commande = {
                                client_id: clientId,
                                livreur_id: livreurId,
                                produits: [{
                                    nom: produitNom,
                                    quantite: quantite,
                                    prix: prix
                                }],
                                statut: 'en cours', // Par défaut en cours
                                date_creation: new Date().toISOString() // Date d'aujourd'hui
                            };

                            return fetch('http://localhost:3000/commandes', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(commande)
                            });
                        });
                });
        })
        .then(response => response.json())
        .then(data => {
            alert('Commande ajoutée avec succès');
            document.getElementById('ajout-commande-form').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert(`Erreur: ${error.message}`);
        });
});