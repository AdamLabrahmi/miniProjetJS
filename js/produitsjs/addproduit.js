// ADD Produit
document.getElementById('ajouter-produit-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier
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