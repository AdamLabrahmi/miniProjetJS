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
                showMessage('Client modifié avec succès.', 'success');
                setTimeout(() => {
                    window.location.href = 'tabC.html'; // Rediriger vers tabC.html après modification
                }, 3000);
            } else {
                showMessage('Erreur lors de la modification du client.', 'error');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la modification du client:', error);
            showMessage('Erreur lors de la modification du client.', 'error');
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
    clientId = urlParams.get('id');
    if (clientId) {
        remplirChampsClient(clientId);
    } else {
        alert('ID du client manquant dans l\'URL.');
    }

    // Ajouter un écouteur d'événement pour le bouton de modification
    document.getElementById('modifier-btn').addEventListener('click', modifClient);
});