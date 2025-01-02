let clientId;

// Fonction pour récupérer les données du client et remplir les champs de saisie
function remplirChampsClient(id) {
    console.log(`Tentative de récupération des données du client avec ID: ${id}`);
    fetch(`http://localhost:3000/clients/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du client');
            }
            return response.json();
        })
        .then(client => {
            console.log('Données du client récupérées:', client);
            document.getElementById('client-nom').value = client.nom;
            document.getElementById('client-prenom').value = client.prenom;
            document.getElementById('client-telephone').value = client.telephone;
            document.getElementById('client-email').value = client.email;
            document.getElementById('client-adresse').value = client.adresse;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du client:', error);
            alert('Erreur lors de la récupération des données du client.');
        });
}

// Fonction pour modifier un client
function modifClient() {
    // Récupérer les valeurs des champs de saisie
    const newNom = document.getElementById('client-nom').value;
    const newPrenom = document.getElementById('client-prenom').value;
    const newTelephone = document.getElementById('client-telephone').value;
    const newEmail = document.getElementById('client-email').value;
    const newAdresse = document.getElementById('client-adresse').value;

    if (newNom && newPrenom && newTelephone && newEmail && newAdresse) {
        const client = {
            nom: newNom,
            prenom: newPrenom,
            telephone: newTelephone,
            email: newEmail,
            adresse: newAdresse
        };

        // Envoyer les modifications au serveur
        fetch(`http://localhost:3000/clients/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
        .then(response => {
            if (response.ok) {
                alert('Client modifié avec succès.');
                window.location.href = 'tabC.html'; // Rediriger vers tabC.html après modification
            } else {
                alert('Erreur lors de la modification du client.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification du client:', error);
            alert('Erreur lors de la modification du client.');
        });
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Appeler la fonction pour remplir les champs de saisie lorsque la page se charge
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    clientId = urlParams.get('id');
    if (clientId) {
        remplirChampsClient(clientId);
    } else {
        alert('ID du client manquant dans l\'URL.');
    }

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifClient);
});