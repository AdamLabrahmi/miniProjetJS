if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../../html/index.html'; 
}

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
        const nom = document.getElementById('nom').value;
        const description = document.getElementById('description').value;
        const prix = document.getElementById('prix').value;
        const stock = document.getElementById('stock').value;
        const categorie = document.getElementById('categorie').value;

        if (nom && description && prix && stock && categorie) {
            const produit = {
                nom: nom,
                description: description,
                prix: prix,
                stock: stock,
                categorie: categorie
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
                showMessage('Produit ajouté avec succès.', 'success');
                document.getElementById('ajout-produit-form').reset();
                setTimeout(() => {
                    window.location.href = 'tabP.html'; // Rediriger vers tabP.html après ajout
                }, 1500);
            })
            .catch(error => {
                console.error('Erreur:', error);
                showMessage('Erreur lors de l\'ajout du produit.', 'error');
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
        }, 1500);
    }
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

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../../html/index.html';
}