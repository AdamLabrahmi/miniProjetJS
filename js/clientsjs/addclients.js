// ADD CLIENT
document.getElementById('ajouter-client-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier
    const client = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        adresse: document.getElementById('adresse').value
    };

    fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    })
    .then(response => response.json())
    .then(data => {
        alert('Client ajouté avec succès');
        document.getElementById('ajout-client-form').reset();
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});