// ADD Livreur
document.getElementById('ajouter-livreur-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier
    const livreur = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        telephone: document.getElementById('telephone').value,
        disponibilite: document.getElementById('disponibilite').value,
        vehicule: document.getElementById('vehicule').value
    };

    fetch('http://localhost:3000/livreurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livreur)
    })
    .then(response => response.json())
    .then(data => {
        alert('Livreur ajouté avec succès');
        document.getElementById('ajout-livreur-form').reset();
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});