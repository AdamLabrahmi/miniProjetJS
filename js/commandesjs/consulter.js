document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../html/index.html'; // Rediriger vers la page de connexion
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const productName = document.getElementById('product-name').value.trim().toLowerCase();
        if (productName) {
            fetch('http://localhost:3000/commandes')
                .then(response => response.json())
                .then(data => {
                    const ordersList = document.getElementById('orders-list');
                    ordersList.innerHTML = ''; // Clear previous results

                    const filteredOrders = data.filter(order => 
                        order.produits.some(produit => produit.nom.toLowerCase().includes(productName))
                    );

                    if (filteredOrders.length > 0) {
                        filteredOrders.forEach(order => {
                            // Fetch client name
                            fetch(`http://localhost:3000/clients/${order.client_id}`)
                                .then(response => response.json())
                                .then(client => {
                                    const clientName = client.nom || 'Client inconnu';

                                    // Fetch livreur name
                                    fetch(`http://localhost:3000/livreurs/${order.livreur_id}`)
                                        .then(response => response.json())
                                        .then(livreur => {
                                            const livreurName = livreur.nom || 'Livreur inconnu';

                                            const orderItem = document.createElement('div');
                                            orderItem.classList.add('p-6', 'border', 'border-gray-300', 'rounded-lg', 'mb-6', 'bg-white', 'shadow-lg');

                                            orderItem.innerHTML = `
                                                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Commande ${order.id}</h3>
                                                <p class="text-gray-600 mb-1"><strong>Client:</strong> ${clientName}</p>
                                                <p class="text-gray-600 mb-1"><strong>Livreur:</strong> ${livreurName}</p>
                                                <p class="text-gray-600 mb-1"><strong>Produits:</strong></p>
                                                <ul class="ml-4 text-gray-700 list-disc">
                                                    ${order.produits.map(produit => `
                                                        <li>${produit.nom} (Quantité: ${produit.quantite}, Prix: ${produit.prix})</li>
                                                    `).join('')}
                                                </ul>
                                                <p class="text-gray-600 mt-2"><strong>Statut:</strong> ${order.statut}</p>
                                                <p class="text-gray-600"><strong>Date:</strong> ${order.date_creation}</p>
                                            `;
                                            ordersList.appendChild(orderItem);
                                        })
                                        .catch(error => {
                                            console.error('Erreur lors de la récupération du livreur:', error);
                                        });
                                })
                                .catch(error => {
                                    console.error('Erreur lors de la récupération du client:', error);
                                });
                        });
                    } else {
                        ordersList.innerHTML = '<p class="text-red-500 text-center font-semibold mt-4">Aucune commande trouvée pour ce produit.</p>';
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des commandes:', error);
                });
        } else {
            alert('Veuillez entrer un nom de produit.');
        }
    });
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