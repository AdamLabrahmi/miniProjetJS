function consulterClient() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    if (nom && prenom) {
        fetch(`http://localhost:3000/clients`)
            .then(response => response.json())
            .then(clients => {
                const client = clients.find(c => c.nom.toLowerCase() === nom.toLowerCase() && c.prenom.toLowerCase() === prenom.toLowerCase());
                if (client) {
                    console.log('Client trouvé:', client);
                    fetch(`http://localhost:3000/commandes`)
                        .then(response => response.json())
                        .then(commandes => {
                            console.log('Commandes récupérées:', commandes);
                            const commandesClient = commandes.filter(c => c.client_id === client.id);
                            console.log('Commandes du client:', commandesClient);
                            const commandesLivrees = commandesClient.filter(c => c.statut === 'Livrée').length;
                            const commandesEnCours = commandesClient.filter(c => c.statut === 'En cours').length;
                            const commandesAnnulees = commandesClient.filter(c => c.statut === 'Annulée').length;

                            document.getElementById('resultat').innerHTML = `
                                <div class="p-4 bg-white rounded-lg shadow-md">
                                    <p class="font-bold text-lg"><strong>Nom:</strong> ${client.nom}</p>
                                    <p class="font-bold text-lg"><strong>Prénom:</strong> ${client.prenom}</p>
                                    <p class="text-gray-700"><strong>Téléphone:</strong> ${client.telephone}</p>
                                    <p class="text-gray-700"><strong>Email:</strong> ${client.email}</p>
                                    <p class="text-gray-700"><strong>Adresse:</strong> ${client.adresse}</p>
                                    <p class="text-gray-700"><strong>Nombre de commandes:</strong> ${commandesClient.length}</p>
                                    <p class="text-green-500"><strong>Commandes livrées:</strong> ${commandesLivrees}</p>
                                    <p class="text-yellow-500"><strong>Commandes en cours:</strong> ${commandesEnCours}</p>
                                    <p class="text-red-500"><strong>Commandes annulées:</strong> ${commandesAnnulees}</p>
                                </div>
                            `;
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des commandes:', error);
                            document.getElementById('resultat').innerHTML = '<p class="text-red-500">Erreur lors de la récupération des commandes.</p>';
                        });
                } else {
                    document.getElementById('resultat').innerHTML = '<p class="text-red-500">Client non trouvé.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des clients:', error);
                document.getElementById('resultat').innerHTML = '<p class="text-red-500">Erreur lors de la récupération des clients.</p>';
            });
    } else {
        document.getElementById('resultat').innerHTML = '<p class="text-red-500">Veuillez entrer le nom et le prénom du client.</p>';
    }
}
