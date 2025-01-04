document.addEventListener('DOMContentLoaded', function() {
    // Charger les catégories
    fetch('http://localhost:3000/produits')
        .then(response => response.json())
        .then(produits => {
            const categorieSelect = document.getElementById('categorie');
            const categories = new Set(); // Utiliser un Set pour stocker les catégories uniques

            produits.forEach(produit => {
                if (!categories.has(produit.categorie)) {
                    categories.add(produit.categorie);
                    const option = document.createElement('option');
                    option.value = produit.categorie; // Utiliser l'ID de la catégorie
                    option.textContent = produit.categorie;
                    categorieSelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des catégories:', error);
        });

    // Ajouter un produit
    document.getElementById('ajouter-produit-btn').addEventListener('click', function() {
        const produit = {
            nom: document.getElementById('nom').value,
            description: document.getElementById('description').value,
            prix: document.getElementById('prix').value,
            stock: document.getElementById('stock').value,
            categorie: document.getElementById('categorie').value 
        };

        fetch('http://localhost:3000/produits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produit)
        })
        .then(response => response.json())
        .then(data => {
            alert('Produit ajouté avec succès');
            document.getElementById('ajout-produit-form').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});