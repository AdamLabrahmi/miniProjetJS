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
                alert('Produit modifié avec succès.');
                window.location.href = '../../html/produits/tabP.html'; // Rediriger vers tabP.html après modification
            } else {
                alert('Erreur lors de la modification du produit.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification du produit:', error);
            alert('Erreur lors de la modification du produit.');
        });
    } else {
        alert('Veuillez remplir tous les champs.');
    }
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