// ADD ZONE
document.getElementById('ajouter-zone-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier

    const zoneNomInput = document.getElementById('zone-nom');
    const villeZoneInput = document.getElementById('ville-zone');
    const codeZoneInput = document.getElementById('code-zone');

    if (zoneNomInput && villeZoneInput && codeZoneInput) {
        const zone = {
            nom: zoneNomInput.value,
            ville: villeZoneInput.value,
            code: codeZoneInput.value,
        };

        fetch('http://localhost:3000/zones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zone)
        })
        .then(response => response.json())
        .then(data => {
            alert('Zone ajoutée avec succès');
            document.getElementById('ajout-zone-form').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    } else {
        console.error('Un ou plusieurs éléments avec les IDs spécifiés sont introuvables.');
    }
});