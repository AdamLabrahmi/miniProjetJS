let produitId;

// Fonction pour récupérer les données du produit et remplir les champs de saisie
function remplirChampsProduit(id) {
    console.log(`Tentative de récupération des données du produit avec ID: ${id}`);
    fetch(`http://localhost:3000/produits/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du produit');
            }
            return response.json();
        })
        .then(produit => {
            console.log('Données du produit récupérées:', produit);
            document.getElementById('produit-nom').value = produit.nom;
            document.getElementById('produit-description').value = produit.description;
            document.getElementById('produit-prix').value = produit.prix;
            document.getElementById('produit-stock').value = produit.stock;
            document.getElementById('produit-categorie').value = produit.categorie;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du produit:', error);
            alert('Erreur lors de la récupération des données du produit.');
        });
}

// Fonction pour charger les noms des produits dans le menu déroulant
function chargerNomsProduits() {
    fetch('http://localhost:3000/produits')
        .then(response => response.json())
        .then(produits => {
            const produitNomSelect = document.getElementById('produit-nom');
            const produitCategorieSelect = document.getElementById('produit-categorie');
            const categories = new Set();

            produits.forEach(produit => {
                const optionNom = document.createElement('option');
                optionNom.value = produit.nom; // Utiliser le nom du produit comme valeur
                optionNom.textContent = produit.nom;
                produitNomSelect.appendChild(optionNom);

                categories.add(produit.categorie);
            });

            categories.forEach(categorie => {
                const optionCategorie = document.createElement('option');
                optionCategorie.value = categorie; // Utiliser la catégorie du produit comme valeur
                optionCategorie.textContent = categorie;
                produitCategorieSelect.appendChild(optionCategorie);
            });

            // Sélectionner le produit de la commande
            if (produitId) {
                fetch(`http://localhost:3000/produits/${produitId}`)
                    .then(response => response.json())
                    .then(produit => {
                        produitNomSelect.value = produit.nom;
                        produitCategorieSelect.value = produit.categorie;
                    })
                    .catch(error => {
                        console.error('Erreur lors de la sélection du produit:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des noms des produits:', error);
            alert('Erreur lors du chargement des noms des produits.');
        });
}

// Fonction pour modifier un produit
function modifProduit() {
    // Récupérer les valeurs des champs de saisie
    const newNom = document.getElementById('produit-nom').value;
    const newDescription = document.getElementById('produit-description').value;
    const newPrix = document.getElementById('produit-prix').value;
    const newStock = document.getElementById('produit-stock').value;
    const newCategorie = document.getElementById('produit-categorie').value;

    if (newNom && newDescription && newPrix && newStock && newCategorie) {
        const produit = {
            nom: newNom,
            description: newDescription,
            prix: newPrix,
            stock: newStock,
            categorie: newCategorie
        };

        // Envoyer les modifications au serveur
        fetch(`http://localhost:3000/produits/${produitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produit)
        })
        .then(response => {
            if (response.ok) {
                showMessage('Produit modifié avec succès.', 'success');
                setTimeout(() => {
                    window.location.href = 'tabP.html'; 
                }, 3000);
            } else {
                showMessage('Erreur lors de la modification du produit.', 'error');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification du produit:', error);
            showMessage('Erreur lors de la modification du produit.', 'error');
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
    produitId = urlParams.get('id');
    if (produitId) {
        remplirChampsProduit(produitId);
    } else {
        alert('ID du produit manquant dans l\'URL.');
    }

    // Charger les noms des produits et les catégories dans les menus déroulants
    chargerNomsProduits();

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifProduit);
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