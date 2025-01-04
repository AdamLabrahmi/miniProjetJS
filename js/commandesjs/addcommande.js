document.addEventListener('DOMContentLoaded', function() {
    let produitsData = [];

    // Charger les noms des clients
    fetch('http://localhost:3000/clients')
        .then(response => response.json())
        .then(clients => {
            const clientSelect = document.getElementById('client-nom');
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id; // Utiliser l'ID du client
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
                option.value = livreur.id; // Utiliser l'ID du livreur
                option.textContent = livreur.nom;
                livreurSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des livreurs:', error);
        });

    // Charger les noms des produits et leurs prix
    fetch('http://localhost:3000/produits')
        .then(response => response.json())
        .then(produits => {
            produitsData = produits; // Stocker les données des produits
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

    // Mettre à jour le prix du produit lorsque le nom du produit est sélectionné
    document.getElementById('produit-nom').addEventListener('change', function() {
        const produitNom = this.value;
        const produit = produitsData.find(p => p.nom === produitNom);
        if (produit) {
            document.getElementById('prix-produit').value = produit.prix;
            calculerTotal();
        }
    });

    // Calculer le total lorsque le prix ou la quantité change
    document.getElementById('prix-produit').addEventListener('input', calculerTotal);
    document.getElementById('quantite').addEventListener('input', calculerTotal);

    function calculerTotal() {
        const prix = parseFloat(document.getElementById('prix-produit').value) || 0;
        const quantite = parseInt(document.getElementById('quantite').value) || 0;
        const total = prix * quantite;
        document.getElementById('total').value = total;
    }

    // Ajouter une commande
    document.getElementById('ajouter-commande-btn').addEventListener('click', function() {
        const clientId = document.getElementById('client-nom').value;
        const livreurId = document.getElementById('livreur-nom').value;
        const produitNom = document.getElementById('produit-nom').value;
        const prixProduit = document.getElementById('prix-produit').value;
        const quantite = document.getElementById('quantite').value;
        const total = document.getElementById('total').value;

        if (clientId && livreurId && produitNom && prixProduit && quantite && total) {
            const commande = {
                client_id: clientId,
                livreur_id: livreurId,
                produits: [{ nom: produitNom, prix: prixProduit, quantite: quantite }],
                statut: 'En cours',
                date_creation: new Date().toISOString().split('T')[0],
                total: total
            };

            // Envoyer la commande au serveur
            fetch('http://localhost:3000/commandes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commande)
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Commande ajoutée avec succès.', 'success');
                    setTimeout(() => {
                        window.location.href = 'tabCom.html'; // Rediriger vers tabCom.html après ajout
                    }, 3000);
                } else {
                    showMessage('Erreur lors de l\'ajout de la commande.', 'error');
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la commande:', error);
                showMessage('Erreur lors de l\'ajout de la commande.', 'error');
            });
        } else {
            showMessage('Veuillez remplir tous les champs.', 'error');
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