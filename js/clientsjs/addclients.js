document.getElementById('ajouter-client-btn').addEventListener('click', function() {
    console.log('Bouton cliqué'); // Ajoutez cette ligne pour vérifier
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const adresse = document.getElementById('adresse').value;

    if (nom && prenom && email && telephone && adresse) {
        const client = {
            nom: nom,
            prenom: prenom,
            email: email,
            telephone: telephone,
            adresse: adresse
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
            document.getElementById('ajout-client-form').reset();

            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fond semi-transparent
            overlay.style.backdropFilter = 'blur(5px)'; // Effet de flou
            overlay.style.zIndex = '999'; // Assurer que l'overlay est au-dessus de tout

            const successMessage = document.createElement('div');
            successMessage.textContent = 'Client ajouté avec succès';
            successMessage.style.position = 'fixed';
            successMessage.style.top = '50%';
            successMessage.style.left = '50%';
            successMessage.style.transform = 'translate(-50%, -50%)';
            successMessage.style.backgroundColor = 'white';
            successMessage.style.color = 'black';
            successMessage.style.padding = '40px'; // Augmentation de la taille
            successMessage.style.borderRadius = '10px'; // Augmentation du rayon des bordures
            successMessage.style.fontSize = '24px'; // Augmentation de la taille de la police
            successMessage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)'; // Augmentation de l'ombre
            successMessage.style.transition = 'opacity 0.5s ease';
            successMessage.style.zIndex = '1000'; // Assurer que le message est au-dessus de l'overlay

            overlay.appendChild(successMessage);
            document.body.appendChild(overlay);

            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    window.location.href = 'tabC.html'; 
                }, 500);
            }, 5000);
        })
        .catch(error => {
            console.error('Erreur:', error);
            showMessage('Erreur lors de l\'ajout du client.', 'error');
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